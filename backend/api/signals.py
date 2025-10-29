from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils import timezone
from .models import inscripciones, progreso_lecciones, insignias, usuario_insignias, lecciones


def grant_badge_for_completion(insc):
    """Create or assign a badge to the user for completing the given inscription's course."""
    try:
        user = insc.usuario
        cap = insc.capacitacion
        # Create or get an insignia for this course completion
        badge_name = f"Completar: {cap.titulo}"
        badge, _ = insignias.objects.get_or_create(
            nombre=badge_name,
            defaults={
                'descripcion': f'Insignia por completar la capacitación "{cap.titulo}"',
                'icono': '',
                'tipo': 'curso',
                'criterio': f'completar_cap_{cap.id_capacitacion}',
                'puntos': getattr(cap, 'puntos_insignia', 0) or 0,
                'color': '#FFD700',
            }
        )

        # assign to user if not already assigned
        if not usuario_insignias.objects.filter(usuario=user, insignia=badge).exists():
            usuario_insignias.objects.create(usuario=user, insignia=badge, capacitaciones=cap)
    except Exception:
        # swallow exceptions to avoid breaking save flows; can be logged if desired
        pass


@receiver(post_save, sender=inscripciones)
def on_inscripcion_saved(sender, instance, created, **kwargs):
    """When an inscription is saved, check if it's completed and grant badge."""
    try:
        # consider completed if fecha_finalizacion set or progreso >= 100
        completed = False
        if instance.fecha_finalizacion:
            completed = True
        elif instance.progreso is not None and instance.progreso >= 100:
            completed = True

        if completed:
            grant_badge_for_completion(instance)
    except Exception:
        pass


@receiver(post_save, sender=progreso_lecciones)
def on_progreso_leccion_saved(sender, instance, created, **kwargs):
    """When a lesson progress is saved, update overall inscription progress and mark completion when appropriate."""
    try:
        insc = instance.inscripcion
        cap = insc.capacitacion

        # total lessons in course
        total = lecciones.objects.filter(capacitacion=cap).count()
        if total == 0:
            percent = 100
        else:
            # count completed lesson progresses for this inscription
            completed = progreso_lecciones.objects.filter(inscripcion=insc, completado=True).count()
            percent = int((completed / total) * 100)

        # update inscription progress and finalization
        changed = False
        if insc.progreso != percent:
            insc.progreso = percent
            changed = True

        if percent >= 100 and not insc.fecha_finalizacion:
            insc.fecha_finalizacion = timezone.now()
            changed = True

        if changed:
            # save without triggering signals recursively too much (post_save will still fire)
            insc.save()
    except Exception:
        pass
