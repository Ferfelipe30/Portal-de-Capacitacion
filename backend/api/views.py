from django.shortcuts import render, get_object_or_404
from django.contrib.auth import authenticate
from rest_framework import generics, status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from rest_framework.decorators import api_view, permission_classes
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from .models import usuarios, modulos, capacitaciones, inscripciones, insignias, usuario_insignias, comentarios, lecciones, progreso_lecciones, notificaciones, estadisticas
from .serializers import UsuarioSerializer, ModuloSerializer, CapacitacionSerializer, InscripcionSerializer, InsigniaSerializer, InsigniaUsuarioSerializer, ComentarioSerializer, LeccionSerializer, ProgresoLeccionSerializer, NotificacionSerializer, EstadisticaSerializer, EmailLoginSerializer

class UsuarioList(generics.ListCreateAPIView):
    queryset = usuarios.objects.all()
    serializer_class = UsuarioSerializer

    def get(self, request):
        Usuarios = usuarios.objects.all()
        serializer = UsuarioSerializer(Usuarios, many=True)
        if not Usuarios:
            raise NotFound('No se encontraron usuarios.')
        return Response({'success': True, 'details': 'Listado de usuarios.', 'data': serializer.data}, status=status.HTTP_200_OK)
    
class UsuarioCrear(generics.CreateAPIView):
    queryset = usuarios.objects.all()
    serializer_class = UsuarioSerializer

    def post(self, request):
        serializer = UsuarioSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'success': True, 'details': 'Usuario creado exitosamente.', 'data': serializer.data}, status=status.HTTP_201_CREATED)
    
class UsuarioActualizar(generics.UpdateAPIView):
    queryset = usuarios.objects.all()
    serializer_class = UsuarioSerializer
    lookup_field = 'id_usuario'

    def put(self, request, id_usuario):
        usuarios = get_object_or_404(usuarios, id_usuario=id_usuario)
        serializer = UsuarioSerializer(usuarios, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'success': True, 'details': 'Usuario actualizado exitosamente.', 'data': serializer.data}, status=status.HTTP_200_OK)
    
class UsuarioEliminar(generics.DestroyAPIView):
    queryset = usuarios.objects.all()
    serializer_class = UsuarioSerializer
    lookup_field = 'id_usuario'

    def delete(self, request, id_usuario):
        usuarios = get_object_or_404(usuarios, id_usuario=id_usuario)
        usuarios.delete()
        return Response({'success': True, 'details': 'Usuario eliminado exitosamente.'}, status=status.HTTP_204_NO_CONTENT)
    
class ModuloList(generics.ListCreateAPIView):
    queryset = modulos.objects.all()
    serializer_class = ModuloSerializer

    def get(self, request):
        Modulos = modulos.objects.all()
        serializer = ModuloSerializer(Modulos, many=True)
        if not Modulos:
            raise NotFound('No se encontraron módulos.')
        return Response({'success': True, 'details': 'Listado de módulos.', 'data': serializer.data}, status=status.HTTP_200_OK)
    
class ModuloCrear(generics.CreateAPIView):
    queryset = modulos.objects.all()
    serializer_class = ModuloSerializer

    def post(self, request):
        serializer = ModuloSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'success': True, 'details': 'Módulo creado exitosamente.', 'data': serializer.data}, status=status.HTTP_201_CREATED)
    
class ModuloActualizar(generics.UpdateAPIView):
    queryset = modulos.objects.all()
    serializer_class = ModuloSerializer
    lookup_field = 'id_modulo'

    def put(self, request, id_modulo):
        modulos = get_object_or_404(modulos, id_modulo=id_modulo)
        serializer = ModuloSerializer(modulos, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'success': True, 'details': 'Módulo actualizado exitosamente.', 'data': serializer.data}, status=status.HTTP_200_OK)
    
class ModuloEliminar(generics.DestroyAPIView):
    queryset = modulos.objects.all()
    serializer_class = ModuloSerializer
    lookup_field = 'id_modulo'

    def delete(self, request, id_modulo):
        modulos = get_object_or_404(modulos, id_modulo=id_modulo)
        modulos.delete()
        return Response({'success': True, 'details': 'Módulo eliminado exitosamente.'}, status=status.HTTP_204_NO_CONTENT)
    
class CapacitacionList(generics.ListCreateAPIView):
    queryset = capacitaciones.objects.all()
    serializer_class = CapacitacionSerializer

    def get(self, request):
        Capacitaciones = capacitaciones.objects.all()
        serializer = CapacitacionSerializer(Capacitaciones, many=True)
        if not Capacitaciones:
            raise NotFound('No se encontraron capacitaciones.')
        return Response({'success': True, 'details': 'Listado de capacitaciones.', 'data': serializer.data}, status=status.HTTP_200_OK)
    
class CapacitacionCrear(generics.CreateAPIView):
    queryset = capacitaciones.objects.all()
    serializer_class = CapacitacionSerializer

    def post(self, request):
        serializer = CapacitacionSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'success': True, 'details': 'Capacitación creada exitosamente.', 'data': serializer.data}, status=status.HTTP_201_CREATED)
    
class CapacitacionActualizar(generics.UpdateAPIView):
    queryset = capacitaciones.objects.all()
    serializer_class = CapacitacionSerializer
    lookup_field = 'id_capacitacion'

    def put(self, request, id_capacitacion):
        capacitaciones = get_object_or_404(capacitaciones, id_capacitacion=id_capacitacion)
        serializer = CapacitacionSerializer(capacitaciones, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'success': True, 'details': 'Capacitación actualizada exitosamente.', 'data': serializer.data}, status=status.HTTP_200_OK)
    
class CapacitacionEliminar(generics.DestroyAPIView):
    queryset = capacitaciones.objects.all()
    serializer_class = CapacitacionSerializer
    lookup_field = 'id_capacitacion'

    def delete(self, request, id_capacitacion):
        capacitaciones = get_object_or_404(capacitaciones, id_capacitacion=id_capacitacion)
        capacitaciones.delete()
        return Response({'success': True, 'details': 'Capacitación eliminada exitosamente.'}, status=status.HTTP_204_NO_CONTENT)
    
class InscripcionList(generics.ListCreateAPIView):
    queryset = inscripciones.objects.all()
    serializer_class = InscripcionSerializer

    def get(self, request):
        Inscripciones = inscripciones.objects.all()
        serializer = InscripcionSerializer(Inscripciones, many=True)
        if not Inscripciones:
            raise NotFound('No se encontraron inscripciones.')
        return Response({'success': True, 'details': 'Listado de inscripciones.', 'data': serializer.data}, status=status.HTTP_200_OK)
    
class InscripcionCrear(generics.CreateAPIView):
    queryset = inscripciones.objects.all()
    serializer_class = InscripcionSerializer

    def post(self, request):
        serializer = InscripcionSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'success': True, 'details': 'Inscripción creada exitosamente.', 'data': serializer.data}, status=status.HTTP_201_CREATED)
    
class InscripcionActualizar(generics.UpdateAPIView):
    queryset = inscripciones.objects.all()
    serializer_class = InscripcionSerializer
    lookup_field = 'id_inscripcion'

    def put(self, request, id_inscripcion):
        inscripciones = get_object_or_404(inscripciones, id_inscripcion=id_inscripcion)
        serializer = InscripcionSerializer(inscripciones, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'success': True, 'details': 'Inscripción actualizada exitosamente.', 'data': serializer.data}, status=status.HTTP_200_OK)
    
class InscripcionEliminar(generics.DestroyAPIView):
    queryset = inscripciones.objects.all()
    serializer_class = InscripcionSerializer
    lookup_field = 'id_inscripcion'

    def delete(self, request, id_inscripcion):
        inscripciones = get_object_or_404(inscripciones, id_inscripcion=id_inscripcion)
        inscripciones.delete()
        return Response({'success': True, 'details': 'Inscripción eliminada exitosamente.'}, status=status.HTTP_204_NO_CONTENT)
    
class InsigniaList(generics.ListCreateAPIView):
    queryset = insignias.objects.all()
    serializer_class = InsigniaSerializer

    def get(self, request):
        Insignias = insignias.objects.all()
        serializer = InsigniaSerializer(Insignias, many=True)
        if not Insignias:
            raise NotFound('No se encontraron insignias.')
        return Response({'success': True, 'details': 'Listado de insignias.', 'data': serializer.data}, status=status.HTTP_200_OK)
    
class InsigniaCrear(generics.CreateAPIView):
    queryset = insignias.objects.all()
    serializer_class = InsigniaSerializer

    def post(self, request):
        serializer = InsigniaSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'success': True, 'details': 'Insignia creada exitosamente.', 'data': serializer.data}, status=status.HTTP_201_CREATED)
    
class InsigniaActualizar(generics.UpdateAPIView):
    queryset = insignias.objects.all()
    serializer_class = InsigniaSerializer
    lookup_field = 'id_insignia'

    def put(self, request, id_insignia):
        insignias = get_object_or_404(insignias, id_insignia=id_insignia)
        serializer = InsigniaSerializer(insignias, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'success': True, 'details': 'Insignia actualizada exitosamente.', 'data': serializer.data}, status=status.HTTP_200_OK)
    
class InsigniaEliminar(generics.DestroyAPIView):
    queryset = insignias.objects.all()
    serializer_class = InsigniaSerializer
    lookup_field = 'id_insignia'

    def delete(self, request, id_insignia):
        insignias = get_object_or_404(insignias, id_insignia=id_insignia)
        insignias.delete()
        return Response({'success': True, 'details': 'Insignia eliminada exitosamente.'}, status=status.HTTP_204_NO_CONTENT)
    
class UsuarioInsigniaList(generics.ListCreateAPIView):
    queryset = usuario_insignias.objects.all()
    serializer_class = InsigniaUsuarioSerializer

    def get(self, request):
        UsuarioInsignias = usuario_insignias.objects.all()
        serializer = InsigniaUsuarioSerializer(UsuarioInsignias, many=True)
        if not UsuarioInsignias:
            raise NotFound('No se encontraron insignias de usuario.')
        return Response({'success': True, 'details': 'Listado de insignias de usuario.', 'data': serializer.data}, status=status.HTTP_200_OK)
    
class UsuarioInsigniaCrear(generics.CreateAPIView):
    queryset = usuario_insignias.objects.all()
    serializer_class = InsigniaUsuarioSerializer

    def post(self, request):
        serializer = InsigniaUsuarioSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'success': True, 'details': 'Insignia de usuario creada exitosamente.', 'data': serializer.data}, status=status.HTTP_201_CREATED)
    
class UsuarioInsigniaActualizar(generics.UpdateAPIView):
    queryset = usuario_insignias.objects.all()
    serializer_class = InsigniaUsuarioSerializer
    lookup_field = 'id_usuario_insignia'

    def put(self, request, id_usuario_insignia):
        usuario_insignias = get_object_or_404(usuario_insignias, id_usuario_insignia=id_usuario_insignia)
        serializer = InsigniaUsuarioSerializer(usuario_insignias, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'success': True, 'details': 'Insignia de usuario actualizada exitosamente.', 'data': serializer.data}, status=status.HTTP_200_OK)

class UsuarioInsigniaEliminar(generics.DestroyAPIView):
    queryset = usuario_insignias.objects.all()
    serializer_class = InsigniaUsuarioSerializer
    lookup_field = 'id_usuario_insignia'

    def delete(self, request, id_usuario_insignia):
        usuario_insignias = get_object_or_404(usuario_insignias, id_usuario_insignia=id_usuario_insignia)
        usuario_insignias.delete()
        return Response({'success': True, 'details': 'Insignia de usuario eliminada exitosamente.'}, status=status.HTTP_204_NO_CONTENT)
    
class ComentarioList(generics.ListCreateAPIView):
    queryset = comentarios.objects.all()
    serializer_class = ComentarioSerializer

    def get(self, request):
        Comentarios = comentarios.objects.all()
        serializer = ComentarioSerializer(Comentarios, many=True)
        if not Comentarios:
            raise NotFound('No se encontraron comentarios.')
        return Response({'success': True, 'details': 'Listado de comentarios.', 'data': serializer.data}, status=status.HTTP_200_OK)

class ComentarioCrear(generics.CreateAPIView):
    queryset = comentarios.objects.all()
    serializer_class = ComentarioSerializer

    def post(self, request):
        serializer = ComentarioSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'success': True, 'details': 'Comentario creado exitosamente.', 'data': serializer.data}, status=status.HTTP_201_CREATED)
    
class ComentarioActualizar(generics.UpdateAPIView):
    queryset = comentarios.objects.all()
    serializer_class = ComentarioSerializer
    lookup_field = 'id_comentario'

    def put(self, request, id_comentario):
        comentarios = get_object_or_404(comentarios, id_comentario=id_comentario)
        serializer = ComentarioSerializer(comentarios, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'success': True, 'details': 'Comentario actualizado exitosamente.', 'data': serializer.data}, status=status.HTTP_200_OK)
    
class ComentarioEliminar(generics.DestroyAPIView):
    queryset = comentarios.objects.all()
    serializer_class = ComentarioSerializer
    lookup_field = 'id_comentario'

    def delete(self, request, id_comentario):
        comentarios = get_object_or_404(comentarios, id_comentario=id_comentario)
        comentarios.delete()
        return Response({'success': True, 'details': 'Comentario eliminado exitosamente.'}, status=status.HTTP_204_NO_CONTENT)
    
class LeccionList(generics.ListCreateAPIView):
    queryset = lecciones.objects.all()
    serializer_class = LeccionSerializer

    def get(self, request):
        Lecciones = lecciones.objects.all()
        serializer = LeccionSerializer(Lecciones, many=True)
        if not Lecciones:
            raise NotFound('No se encontraron lecciones.')
        return Response({'success': True, 'details': 'Listado de lecciones.', 'data': serializer.data}, status=status.HTTP_200_OK)
    
class LeccionCrear(generics.CreateAPIView):
    queryset = lecciones.objects.all()
    serializer_class = LeccionSerializer

    def post(self, request):
        serializer = LeccionSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'success': True, 'details': 'Lección creada exitosamente.', 'data': serializer.data}, status=status.HTTP_201_CREATED)
    
class LeccionActualizar(generics.UpdateAPIView):
    queryset = lecciones.objects.all()
    serializer_class = LeccionSerializer
    lookup_field = 'id_leccion'

    def put(self, request, id_leccion):
        lecciones = get_object_or_404(lecciones, id_leccion=id_leccion)
        serializer = LeccionSerializer(lecciones, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'success': True, 'details': 'Lección actualizada exitosamente.', 'data': serializer.data}, status=status.HTTP_200_OK)
    
class LeccionEliminar(generics.DestroyAPIView):
    queryset = lecciones.objects.all()
    serializer_class = LeccionSerializer
    lookup_field = 'id_leccion'

    def delete(self, request, id_leccion):
        lecciones = get_object_or_404(lecciones, id_leccion=id_leccion)
        lecciones.delete()
        return Response({'success': True, 'details': 'Lección eliminada exitosamente.'}, status=status.HTTP_204_NO_CONTENT)
    
class ProgresoLeccionList(generics.ListCreateAPIView):
    queryset = progreso_lecciones.objects.all()
    serializer_class = ProgresoLeccionSerializer

    def get(self, request):
        Progresos = progreso_lecciones.objects.all()
        serializer = ProgresoLeccionSerializer(Progresos, many=True)
        if not Progresos:
            raise NotFound('No se encontraron progresos de lecciones.')
        return Response({'success': True, 'details': 'Listado de progresos de lecciones.', 'data': serializer.data}, status=status.HTTP_200_OK)

class ProgresoLeccionCrear(generics.CreateAPIView):
    queryset = progreso_lecciones.objects.all()
    serializer_class = ProgresoLeccionSerializer

    def post(self, request):
        serializer = ProgresoLeccionSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'success': True, 'details': 'Progreso de lección creado exitosamente.', 'data': serializer.data}, status=status.HTTP_201_CREATED)
    
class ProgresoLeccionActualizar(generics.UpdateAPIView):
    queryset = progreso_lecciones.objects.all()
    serializer_class = ProgresoLeccionSerializer
    lookup_field = 'id_progreso'

    def put(self, request, id_progreso):
        progreso_lecciones = get_object_or_404(progreso_lecciones, id_progreso=id_progreso)
        serializer = ProgresoLeccionSerializer(progreso_lecciones, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'success': True, 'details': 'Progreso de lección actualizado exitosamente.', 'data': serializer.data}, status=status.HTTP_200_OK)
    
class ProgresoLeccionEliminar(generics.DestroyAPIView):
    queryset = progreso_lecciones.objects.all()
    serializer_class = ProgresoLeccionSerializer
    lookup_field = 'id_progreso'

    def delete(self, request, id_progreso):
        progreso_lecciones = get_object_or_404(progreso_lecciones, id_progreso=id_progreso)
        progreso_lecciones.delete()
        return Response({'success': True, 'details': 'Progreso de lección eliminado exitosamente.'}, status=status.HTTP_204_NO_CONTENT)

class NotificacionList(generics.ListCreateAPIView):
    queryset = notificaciones.objects.all()
    serializer_class = NotificacionSerializer

    def get(self, request):
        Notificaciones = notificaciones.objects.all()
        serializer = NotificacionSerializer(Notificaciones, many=True)
        if not Notificaciones:
            raise NotFound('No se encontraron notificaciones.')
        return Response({'success': True, 'details': 'Listado de notificaciones.', 'data': serializer.data}, status=status.HTTP_200_OK)
    
class NotificacionCrear(generics.CreateAPIView):
    queryset = notificaciones.objects.all()
    serializer_class = NotificacionSerializer

    def post(self, request):
        serializer = NotificacionSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'success': True, 'details': 'Notificación creada exitosamente.', 'data': serializer.data}, status=status.HTTP_201_CREATED)

class NotificacionActualizar(generics.UpdateAPIView):
    queryset = notificaciones.objects.all()
    serializer_class = NotificacionSerializer
    lookup_field = 'id_notificacion'

    def put(self, request, id_notificacion):
        notificaciones = get_object_or_404(notificaciones, id_notificacion=id_notificacion)
        serializer = NotificacionSerializer(notificaciones, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'success': True, 'details': 'Notificación actualizada exitosamente.', 'data': serializer.data}, status=status.HTTP_200_OK)
    
class NotificacionEliminar(generics.DestroyAPIView):
    queryset = notificaciones.objects.all()
    serializer_class = NotificacionSerializer
    lookup_field = 'id_notificacion'

    def delete(self, request, id_notificacion):
        notificaciones = get_object_or_404(notificaciones, id_notificacion=id_notificacion)
        notificaciones.delete()
        return Response({'success': True, 'details': 'Notificación eliminada exitosamente.'}, status=status.HTTP_204_NO_CONTENT)
    
class EstadisticaList(generics.ListCreateAPIView):
    queryset = estadisticas.objects.all()
    serializer_class = EstadisticaSerializer

    def get(self, request):
        Estadisticas = estadisticas.objects.all()
        serializer = EstadisticaSerializer(Estadisticas, many=True)
        if not Estadisticas:
            raise NotFound('No se encontraron estadísticas.')
        return Response({'success': True, 'details': 'Listado de estadísticas.', 'data': serializer.data}, status=status.HTTP_200_OK)

class EstadisticaCrear(generics.CreateAPIView):
    queryset = estadisticas.objects.all()
    serializer_class = EstadisticaSerializer

    def post(self, request):
        serializer = EstadisticaSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'success': True, 'details': 'Estadística creada exitosamente.', 'data': serializer.data}, status=status.HTTP_201_CREATED)

class EstadisticaActualizar(generics.UpdateAPIView):
    queryset = estadisticas.objects.all()
    serializer_class = EstadisticaSerializer
    lookup_field = 'id_estadistica'

    def put(self, request, id_estadistica):
        estadisticas = get_object_or_404(estadisticas, id_estadistica=id_estadistica)
        serializer = EstadisticaSerializer(estadisticas, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'success': True, 'details': 'Estadística actualizada exitosamente.', 'data': serializer.data}, status=status.HTTP_200_OK)
    
class EstadisticaEliminar(generics.DestroyAPIView):
    queryset = estadisticas.objects.all()
    serializer_class = EstadisticaSerializer
    lookup_field = 'id_estadistica'

    def delete(self, request, id_estadistica):
        estadisticas = get_object_or_404(estadisticas, id_estadistica=id_estadistica)
        estadisticas.delete()
        return Response({'success': True, 'details': 'Estadística eliminada exitosamente.'}, status=status.HTTP_204_NO_CONTENT)
    
class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = EmailLoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        # Obtener usuario del serializer validado
        user_data = serializer.validated_data['user']
        user = usuarios.objects.get(id_usuario=user_data['id_usuario'])
        
        # Generar tokens JWT
        refresh = RefreshToken.for_user(user)
        
        return Response({
            'success': True,
            'details': 'Inicio de sesión exitoso.',
            'data': {
                'user': user_data,
                'access': str(refresh.access_token),
                'refresh': str(refresh),
            }
        }, status=status.HTTP_200_OK)