from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password
from .models import usuarios, modulos, capacitaciones, inscripciones, insignias, usuario_insignias, comentarios, lecciones, progreso_lecciones, notificaciones, estadisticas

User = get_user_model()

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = usuarios
        fields = '__all__'
        extra_kwargs = {
            'password': {'write_only': True},
            'id_usuario': {'read_only': True},
            'fecha_registro': {'read_only': True},
            'ultima_conexion': {'read_only': True},
        }

    def create(self, validated_data):
        if 'password' in validated_data:
            validated_data['password'] = make_password(validated_data['password'])
        return usuarios.objects.create(**validated_data)

    def update(self, instance, validated_data):
        if 'password' in validated_data:
            validated_data['password'] = make_password(validated_data['password'])
        return super().update(instance, validated_data)

class ModuloSerializer(serializers.ModelSerializer):
    class Meta:
        model = modulos
        fields = '__all__'
        extra_kwargs = {
            'id_modulo': {'read_only': True},
            'fecha_creacion': {'read_only': True},
        }

class CapacitacionSerializer(serializers.ModelSerializer):
    modulo_nombre = serializers.CharField(source='modulo.nombre', read_only=True)
    instructor_nombre = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = capacitaciones
        fields = '__all__'
        extra_kwargs = {
            'id_capacitacion': {'read_only': True},
            'fecha_creacion': {'read_only': True},
        }

    def get_instructor_nombre(self, obj):
        if obj.instructor:
            return f"{obj.instructor.nombre} {obj.instructor.apellido}"
        return None

    def validate_tipo(self, value):
        if value not in ['interna', 'externa']:
            raise serializers.ValidationError('El tipo debe ser "interna" o "externa".')
        return value

    def validate_nivel(self, value):
        if value not in ['basico', 'intermedio', 'avanzado']:
            raise serializers.ValidationError('El nivel debe ser "basico", "intermedio" o "avanzado".')
        return value

    def validate_estado(self, value):
        if value not in ['borrador', 'publicado', 'archivado']:
            raise serializers.ValidationError('El estado debe ser "borrador", "publicado" o "archivado".')
        return value

    def validate_tipo_recurso(self, value):
        if value not in ['video', 'documento', 'enlace', 'scorm']:
            raise serializers.ValidationError('El tipo de recurso debe ser "video", "documento", "enlace" o "scorm".')
        return value
    
class InscripcionSerializer(serializers.ModelSerializer):
    usuario_nombre = serializers.CharField(source='usuario.nombre', read_only=True)
    capacitacion_titulo = serializers.CharField(source='capacitacion.titulo', read_only=True)

    class Meta:
        model = inscripciones
        fields = '__all__'
        extra_kwargs = {
            'id_inscripcion': {'read_only': True},
            'fecha_inscripcion': {'read_only': True},
            'progreso': {'read_only': True},
            'calificacion': {'read_only': True},
        }

class InsigniaSerializer(serializers.ModelSerializer):
    class Meta:
        model = insignias
        fields = '__all__'
        extra_kwargs = {
            'id_insignia': {'read_only': True},
            'fecha_creacion': {'read_only': True},
        }

class InsigniaUsuarioSerializer(serializers.ModelSerializer):
    usuario_nombre = serializers.CharField(source='usuario.nombre', read_only=True)
    insignia_nombre = serializers.CharField(source='insignia.nombre', read_only=True)

    class Meta:
        model = usuario_insignias
        fields = '__all__'
        extra_kwargs = {
            'id_usuario_insignia': {'read_only': True},
            'fecha_obtencion': {'read_only': True},
        }

class ComentarioSerializer(serializers.ModelSerializer):
    usuario_nombre = serializers.CharField(source='usuario.nombre', read_only=True)
    capacitacion_titulo = serializers.CharField(source='capacitacion.titulo', read_only=True)

    class Meta:
        model = comentarios
        fields = '__all__'
        extra_kwargs = {
            'id_comentario': {'read_only': True},
            'fecha_creacion': {'read_only': True},
        }

class LeccionSerializer(serializers.ModelSerializer):
    capacitacion_titulo = serializers.CharField(source='capacitacion.titulo', read_only=True)

    class Meta:
        model = lecciones
        fields = '__all__'
        extra_kwargs = {
            'id_leccion': {'read_only': True},
            'fecha_creacion': {'read_only': True},
        }

class ProgresoLeccionSerializer(serializers.ModelSerializer):
    usuario_nombre = serializers.CharField(source='usuario.nombre', read_only=True)
    leccion_titulo = serializers.CharField(source='leccion.titulo', read_only=True)

    class Meta:
        model = progreso_lecciones
        fields = '__all__'
        extra_kwargs = {
            'id_progreso': {'read_only': True},
            'fecha_completado': {'read_only': True},
        }

    def validate(self, attrs):
        insc = attrs.get('inscripcion')
        lec = attrs.get('leccion')
        if insc and lec and insc.capacitacion_id != lec.capacitacion_id:
            raise serializers.ValidationError('La lección no pertenece a la misma capacitación de la inscripción.')
        return attrs

    def create(self, validated_data):
        if validated_data.get('completado'):
            from django.utils import timezone
            validated_data['fecha_completado'] = timezone.now()
        return super().create(validated_data)

    def update(self, instance, validated_data):
        if 'completado' in validated_data:
            from django.utils import timezone
            instance.fecha_completado = timezone.now() if validated_data['completado'] else None
        return super().update(instance, validated_data)
    
class NotificacionSerializer(serializers.ModelSerializer):
    usuario_nombre = serializers.CharField(source='usuario.nombre', read_only=True)

    class Meta:
        model = notificaciones
        fields = '__all__'
        extra_kwargs = {
            'id_notificacion': {'read_only': True},
            'fecha_creacion': {'read_only': True},
        }

class EstadisticaSerializer(serializers.ModelSerializer):
    usuario_nombre = serializers.CharField(source='usuario.nombre', read_only=True)

    class Meta:
        model = estadisticas
        fields = '__all__'
        extra_kwargs = {
            'id_estadistica': {'read_only': True},
        }

class EmailLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        try:
            user = usuarios.objects.get(email=attrs['email'])
            if not user.check_password(attrs['password']):
                raise serializers.ValidationError('Credenciales inválidas.')
            
            # Actualizar última conexión
            from django.utils import timezone
            user.ultima_conexion = timezone.now()
            user.save(update_fields=['ultima_conexion'])
            
            return {
                'user': {
                    'id_usuario': user.id_usuario,
                    'nombre': user.nombre,
                    'apellido': user.apellido,
                    'email': user.email,
                    'rol': user.rol,
                    'departamento': user.departamento,
                    'fecha_registro': user.fecha_registro,
                    'ultima_conexion': user.ultima_conexion,
                    'estado': user.estado,
                    'foto_perfil': user.foto_perfil.url if user.foto_perfil else None,
                }
            }
        except usuarios.DoesNotExist:
            raise serializers.ValidationError('Credenciales inválidas.')    