from django.urls import path
from .views import (
    UsuarioList, UsuarioCrear, UsuarioActualizar, UsuarioEliminar, 
    ModuloList, ModuloCrear, ModuloActualizar, ModuloEliminar, 
    CapacitacionList, CapacitacionCrear, CapacitacionActualizar, CapacitacionEliminar,
    InscripcionList, InscripcionCrear, InscripcionActualizar, InscripcionEliminar,
    InsigniaList, InsigniaCrear, InsigniaActualizar, InsigniaEliminar,
    UsuarioInsigniaList, UsuarioInsigniaCrear, UsuarioInsigniaActualizar, UsuarioInsigniaEliminar,
    ComentarioList, ComentarioCrear, ComentarioActualizar, ComentarioEliminar,
    LeccionList, LeccionCrear, LeccionActualizar, LeccionEliminar,
    ProgresoLeccionList, ProgresoLeccionCrear, ProgresoLeccionActualizar, ProgresoLeccionEliminar,
    NotificacionList, NotificacionCrear, NotificacionActualizar, NotificacionEliminar,
    EstadisticaList, EstadisticaCrear, EstadisticaActualizar, EstadisticaEliminar
)

urlpatterns = [
    # Usuarios
    path('usuarios/', UsuarioList.as_view(), name='usuario-list'),
    path('usuarios/crear/', UsuarioCrear.as_view(), name='usuario-crear'),
    path('usuarios/<int:id_usuario>/actualizar/', UsuarioActualizar.as_view(), name='usuario-actualizar'),
    path('usuarios/<int:id_usuario>/eliminar/', UsuarioEliminar.as_view(), name='usuario-eliminar'),
    # Modulos
    path('modulos/', ModuloList.as_view(), name='modulo-list'),
    path('modulos/crear/', ModuloCrear.as_view(), name='modulo-crear'),
    path('modulos/<int:id_modulo>/actualizar/', ModuloActualizar.as_view(), name='modulo-actualizar'),
    path('modulos/<int:id_modulo>/eliminar/', ModuloEliminar.as_view(), name='modulo-eliminar'),
    # Capacitaciones
    path('capacitaciones/', CapacitacionList.as_view(), name='capacitacion-list'),
    path('capacitaciones/crear/', CapacitacionCrear.as_view(), name='capacitacion-crear'),
    path('capacitaciones/<int:id_capacitacion>/actualizar/', CapacitacionActualizar.as_view(), name='capacitacion-actualizar'),
    path('capacitaciones/<int:id_capacitacion>/eliminar/', CapacitacionEliminar.as_view(), name='capacitacion-eliminar'),
    # Inscripciones
    path('inscripciones/', InscripcionList.as_view(), name='inscripcion-list'),
    path('inscripciones/crear/', InscripcionCrear.as_view(), name='inscripcion-crear'),
    path('inscripciones/<int:id_inscripcion>/actualizar/', InscripcionActualizar.as_view(), name='inscripcion-actualizar'),
    path('inscripciones/<int:id_inscripcion>/eliminar/', InscripcionEliminar.as_view(), name='inscripcion-eliminar'),
    # Insignias
    path('insignias/', InsigniaList.as_view(), name='insignia-list'),
    path('insignias/crear/', InsigniaCrear.as_view(), name='insignia-crear'),
    path('insignias/<int:id_insignia>/actualizar/', InsigniaActualizar.as_view(), name='insignia-actualizar'),
    path('insignias/<int:id_insignia>/eliminar/', InsigniaEliminar.as_view(), name='insignia-eliminar'),
    # Usuario Insignias
    path('usuario-insignias/', UsuarioInsigniaList.as_view(), name='usuario-insignia-list'),
    path('usuario-insignias/crear/', UsuarioInsigniaCrear.as_view(), name='usuario-insignia-crear'),
    path('usuario-insignias/<int:id_usuario_insignia>/actualizar/', UsuarioInsigniaActualizar.as_view(), name='usuario-insignia-actualizar'),
    path('usuario-insignias/<int:id_usuario_insignia>/eliminar/', UsuarioInsigniaEliminar.as_view(), name='usuario-insignia-eliminar'),
    # Comentarios
    path('comentarios/', ComentarioList.as_view(), name='comentario-list'),
    path('comentarios/crear/', ComentarioCrear.as_view(), name='comentario-crear'),
    path('comentarios/<int:id_comentario>/actualizar/', ComentarioActualizar.as_view(), name='comentario-actualizar'),
    path('comentarios/<int:id_comentario>/eliminar/', ComentarioEliminar.as_view(), name='comentario-eliminar'),
    # Lecciones
    path('lecciones/', LeccionList.as_view(), name='leccion-list'),
    path('lecciones/crear/', LeccionCrear.as_view(), name='leccion-crear'),
    path('lecciones/<int:id_leccion>/actualizar/', LeccionActualizar.as_view(), name='leccion-actualizar'),
    path('lecciones/<int:id_leccion>/eliminar/', LeccionEliminar.as_view(), name='leccion-eliminar'),
    # Progreso Lecciones
    path('progreso-lecciones/', ProgresoLeccionList.as_view(), name='progreso-leccion-list'),
    path('progreso-lecciones/crear/', ProgresoLeccionCrear.as_view(), name='progreso-leccion-crear'),
    path('progreso-lecciones/<int:id_progreso_leccion>/actualizar/', ProgresoLeccionActualizar.as_view(), name='progreso-leccion-actualizar'),
    path('progreso-lecciones/<int:id_progreso_leccion>/eliminar/', ProgresoLeccionEliminar.as_view(), name='progreso-leccion-eliminar'),
    # Notificaciones
    path('notificaciones/', NotificacionList.as_view(), name='notificacion-list'),
    path('notificaciones/crear/', NotificacionCrear.as_view(), name='notificacion-crear'),
    path('notificaciones/<int:id_notificacion>/actualizar/', NotificacionActualizar.as_view(), name='notificacion-actualizar'),
    path('notificaciones/<int:id_notificacion>/eliminar/', NotificacionEliminar.as_view(), name='notificacion-eliminar'),
    # Estadisticas
    path('estadisticas/', EstadisticaList.as_view(), name='estadistica-list'),
    path('estadisticas/crear/', EstadisticaCrear.as_view(), name='estadistica-crear'),
    path('estadisticas/<int:id_estadistica>/actualizar/', EstadisticaActualizar.as_view(), name='estadistica-actualizar'),
    path('estadisticas/<int:id_estadistica>/eliminar/', EstadisticaEliminar.as_view(), name='estadistica-eliminar'),
]