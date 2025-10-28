from django.db import models
from django.contrib.auth.hashers import check_password as dj_check_password

class usuarios(models.Model):
    id_usuario = models.AutoField(primary_key=True, editable=False, db_column='id_usuario')
    nombre = models.CharField(max_length=100, db_column='nombre')
    apellido = models.CharField(max_length=100, db_column='apellido')
    email = models.EmailField(max_length=150, unique=True, db_column='email')
    password = models.CharField(max_length=255, db_column='password_hash')
    rol = models.CharField(max_length=50, db_column='rol')
    departamento = models.CharField(max_length=100, db_column='departamento')
    fecha_registro = models.DateTimeField(auto_now_add=True, db_column='fecha_registro')
    ultima_conexion = models.DateTimeField(auto_now=True, db_column='ultima_conexion')
    estado = models.BooleanField(default=True, db_column='estado')
    foto_perfil = models.ImageField(upload_to='fotos_perfil/', null=True, blank=True, db_column='foto_perfil')

    def check_password(self, raw_password):
        try:
            return dj_check_password(raw_password, self.password)
        except Exception:
            return self.password == raw_password 
    
    def __str__(self):
        return f"{self.nombre} {self.apellido} ({self.email})"
    
    class Meta:
        db_table = 'usuarios'
        verbose_name = 'Usuario'
        verbose_name_plural = 'Usuarios'

class modulos(models.Model):
    id_modulo = models.AutoField(primary_key=True, editable=False, db_column='id_modulo')
    nombre = models.CharField(max_length=100, db_column='nombre')
    descripcion = models.TextField(db_column='descripcion')
    icono = models.CharField(max_length=100, db_column='icono')
    color = models.CharField(max_length=7, db_column='color')
    orden = models.IntegerField(db_column='orden')
    estado = models.BooleanField(default=True, db_column='estado')
    fecha_creacion = models.DateTimeField(auto_now_add=True, db_column='fecha_creacion')

    def __str__(self):
        return self.nombre
    
    class Meta:
        db_table = 'modulos'
        verbose_name = 'Modulo'
        verbose_name_plural = 'Modulos'

class capacitaciones(models.Model):
    id_capacitacion = models.AutoField(primary_key=True, editable=False, db_column='id_capacitacion')
    titulo = models.CharField(max_length=200, db_column='titulo')
    descripcion = models.TextField(db_column='descripcion')
    modulo = models.ForeignKey(modulos, on_delete=models.CASCADE, db_column='id_modulo')
    instructor = models.ForeignKey(usuarios, on_delete=models.CASCADE, db_column='id_instructor')
    tipo = models.CharField(max_length=20, db_column='tipo')
    nivel = models.CharField(max_length=20, db_column='nivel')
    duracion_horas = models.IntegerField(db_column='duracion_horas')
    url_recurso = models.URLField(max_length=500, db_column='url_recurso')
    tipo_recurso = models.CharField(max_length=50, db_column='tipo_recurso')
    fecha_creacion = models.DateTimeField(auto_now_add=True, db_column='fecha_creacion')
    fecha_publicacion = models.DateTimeField(null=True, blank=True, db_column='fecha_publicacion')
    estado = models.CharField(max_length=20, db_column='estado')
    puntos_insignia = models.IntegerField(db_column='puntos_insignia')
    thumbnail = models.CharField(max_length=255, null=True, blank=True, db_column='thumbnail')

    def __str__(self):
        return self.titulo
    
    class Meta:
        db_table = 'capacitaciones'
        verbose_name = 'Capacitacion'
        verbose_name_plural = 'Capacitaciones'

class inscripciones(models.Model):
    id_inscripcion = models.AutoField(primary_key=True, editable=False, db_column='id_inscripcion')
    usuario = models.ForeignKey(usuarios, on_delete=models.CASCADE, db_column='id_usuario')
    capacitacion = models.ForeignKey(capacitaciones, on_delete=models.CASCADE, db_column='id_capacitacion')
    fecha_inscripcion = models.DateTimeField(auto_now_add=True, db_column='fecha_inscripcion')
    fecha_finalizacion = models.DateTimeField(null=True, blank=True, db_column='fecha_finalizacion')
    progreso = models.FloatField(default=0.0, db_column='progreso')
    estado = models.CharField(max_length=20, db_column='estado')
    calificacion = models.FloatField(null=True, blank=True, db_column='calificacion')

    def __str__(self):
        return f"Inscripcion de {self.usuario} en {self.capacitacion}"
    
    class Meta:
        db_table = 'inscripciones'
        verbose_name = 'Inscripcion'
        verbose_name_plural = 'Inscripciones'

class insignias(models.Model):
    id_insignia = models.AutoField(primary_key=True, editable=False, db_column='id_insignia')
    nombre = models.CharField(max_length=100, db_column='nombre')
    descripcion = models.TextField(db_column='descripcion')
    icono = models.CharField(max_length=255, db_column='icono')
    tipo = models.CharField(max_length=30, db_column='tipo')
    criterio = models.CharField(max_length=255, db_column='criterio')
    puntos = models.IntegerField(db_column='puntos')
    color = models.CharField(max_length=7, db_column='color')
    fecha_creacion = models.DateTimeField(auto_now_add=True, db_column='fecha_creacion')

    def __str__(self):
        return self.nombre
    
    class Meta:
        db_table = 'insignias'
        verbose_name = 'Insignia'
        verbose_name_plural = 'Insignias'

class usuario_insignias(models.Model):
    id_usuario_insignia = models.AutoField(primary_key=True, editable=False, db_column='id_usuario_insignia')
    usuario = models.ForeignKey(usuarios, on_delete=models.CASCADE, db_column='id_usuario')
    insignia = models.ForeignKey(insignias, on_delete=models.CASCADE, db_column='id_insignia')
    capacitaciones = models.ForeignKey(capacitaciones, on_delete=models.CASCADE, null=True, blank=True, db_column='id_capacitacion')
    fecha_obtencion = models.DateTimeField(auto_now_add=True, db_column='fecha_obtencion')

    def __str__(self):
        return f"{self.usuario} - {self.insignia}"
    
    class Meta:
        db_table = 'usuario_insignias'
        verbose_name = 'Usuario Insignia'
        verbose_name_plural = 'Usuario Insignias'

class comentarios(models.Model):
    id_comentario = models.AutoField(primary_key=True, editable=False, db_column='id_comentario')
    usuario = models.ForeignKey(usuarios, on_delete=models.CASCADE, db_column='id_usuario')
    capacitacion = models.ForeignKey(capacitaciones, on_delete=models.CASCADE, db_column='id_capacitacion')
    comentario = models.TextField(db_column='comentario')
    calificacion = models.IntegerField(db_column='calificacion')
    fecha_comentario = models.DateTimeField(auto_now_add=True, db_column='fecha_comentario')

    def __str__(self):
        return f"Comentario de {self.usuario} en {self.capacitacion}"
    
    class Meta:
        db_table = 'comentarios'
        verbose_name = 'Comentario'
        verbose_name_plural = 'Comentarios'

class lecciones(models.Model):
    id_leccion = models.AutoField(primary_key=True, editable=False, db_column='id_leccion')
    capacitacion = models.ForeignKey(capacitaciones, on_delete=models.CASCADE, db_column='id_capacitacion')
    titulo = models.CharField(max_length=200, db_column='titulo')
    contenido = models.TextField(db_column='contenido')
    orden = models.IntegerField(db_column='orden')
    duracion_minutos = models.IntegerField(db_column='duracion_minutos')
    url_recurso = models.URLField(max_length=500, null=True, blank=True, db_column='url_recurso')

    def __str__(self):
        return self.titulo
    
    class Meta:
        db_table = 'lecciones'
        verbose_name = 'Leccion'
        verbose_name_plural = 'Lecciones'

class progreso_lecciones(models.Model):
    id_progreso = models.AutoField(primary_key=True, editable=False, db_column='id_progreso')
    inscripcion = models.ForeignKey(inscripciones, on_delete=models.CASCADE, db_column='id_inscripcion')
    leccion = models.ForeignKey(lecciones, on_delete=models.CASCADE, db_column='id_leccion')
    completado = models.BooleanField(default=False, db_column='completado')
    fecha_completado = models.DateTimeField(null=True, blank=True, db_column='fecha_completado')
    tiempo_visualizacion = models.IntegerField(default=0, db_column='tiempo_visualizacion')

    def __str__(self):
        return f"Progreso de {self.inscripcion.usuario} en {self.leccion}"
    
    class Meta:
        db_table = 'progreso_lecciones'
        verbose_name = 'Progreso Leccion'
        verbose_name_plural = 'Progreso Lecciones'

class notificaciones(models.Model):
    id_notificacion = models.AutoField(primary_key=True, editable=False, db_column='id_notificacion')
    usuario = models.ForeignKey(usuarios, on_delete=models.CASCADE, db_column='id_usuario')
    tipo = models.CharField(max_length=50, db_column='tipo')
    titulo = models.CharField(max_length=200, db_column='titulo')
    mensaje = models.TextField(db_column='mensaje')
    leida = models.BooleanField(default=False, db_column='leida')
    url_referencia = models.URLField(max_length=500, null=True, blank=True, db_column='url_referencia')
    fecha_creacion = models.DateTimeField(auto_now_add=True, db_column='fecha_creacion')

    def __str__(self):
        return f"Notificacion para {self.usuario}"
    
    class Meta:
        db_table = 'notificaciones'
        verbose_name = 'Notificacion'
        verbose_name_plural = 'Notificaciones'

class estadisticas(models.Model):
    id_estadistica = models.AutoField(primary_key=True, editable=False, db_column='id_estadistica')
    usuario = models.ForeignKey(usuarios, on_delete=models.CASCADE, db_column='id_usuario')
    total_cursos_completados = models.IntegerField(default=0, db_column='total_cursos_completados')
    total_horas_aprendizaje = models.IntegerField(default=0, db_column='total_horas_aprendizaje')
    total_insignias = models.IntegerField(default=0, db_column='total_insignias')
    racha_dias = models.IntegerField(default=0, db_column='racha_dias')
    ultima_actividad = models.DateTimeField(null=True, blank=True, db_column='ultima_actividad')
    fecha_actualizacion = models.DateTimeField(auto_now=True, db_column='fecha_actualizacion')

    def __str__(self):
        return f"Estadistica de {self.usuario} en {self.capacitacion}"
    
    class Meta:
        db_table = 'estadisticas'
        verbose_name = 'Estadistica'
        verbose_name_plural = 'Estadisticas'