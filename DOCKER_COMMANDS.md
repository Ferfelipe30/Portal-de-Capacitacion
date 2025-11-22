# Guía de Referencia Rápida - Docker Commands

## 🚀 Inicio Rápido

### Iniciar el proyecto (Desarrollo)
```bash
docker-compose -f docker-compose.dev.yml up --build
```

### Iniciar el proyecto (Producción)
```bash
docker-compose up -d --build
```

### Detener todo
```bash
docker-compose down
```

## 📋 Comandos Esenciales

### Ver estado de servicios
```bash
docker-compose ps
```

### Ver logs en tiempo real
```bash
# Todos los servicios
docker-compose logs -f

# Solo backend
docker-compose logs -f backend

# Solo frontend
docker-compose logs -f frontend

# Solo últimas 50 líneas
docker-compose logs --tail=50 backend
```

### Reiniciar servicios
```bash
# Todos
docker-compose restart

# Solo uno
docker-compose restart backend
```

### Reconstruir un servicio
```bash
docker-compose up -d --build backend
```

## 🗄️ Base de Datos

### Ejecutar migraciones
```bash
docker-compose exec backend python manage.py migrate
```

### Crear migraciones
```bash
docker-compose exec backend python manage.py makemigrations
```

### Crear superusuario
```bash
docker-compose exec backend python manage.py createsuperuser
```

### Acceder a la shell de Django
```bash
docker-compose exec backend python manage.py shell
```

### Acceder directamente a PostgreSQL
```bash
docker-compose exec db psql -U postgres -d portal_capacitacion
```

### Backup de base de datos
```bash
# Crear backup
docker-compose exec db pg_dump -U postgres portal_capacitacion > backup.sql

# Restaurar backup
docker-compose exec -T db psql -U postgres -d portal_capacitacion < backup.sql
```

## 📦 Backend (Django)

### Ejecutar comandos Django
```bash
docker-compose exec backend python manage.py [comando]
```

### Instalar nueva dependencia
```bash
# Entrar al contenedor
docker-compose exec backend sh

# Instalar paquete
pip install nombre-paquete

# Actualizar requirements
pip freeze > requirements.txt

# Salir
exit

# Reconstruir imagen
docker-compose up -d --build backend
```

### Ejecutar tests
```bash
docker-compose exec backend python manage.py test
```

### Recolectar archivos estáticos
```bash
docker-compose exec backend python manage.py collectstatic --noinput
```

### Ver configuración actual
```bash
docker-compose exec backend python manage.py diffsettings
```

## 🎨 Frontend (React)

### Acceder al contenedor en desarrollo
```bash
docker-compose -f docker-compose.dev.yml exec frontend-dev sh
```

### Instalar nueva dependencia npm
```bash
# En desarrollo (con volumen montado)
docker-compose -f docker-compose.dev.yml exec frontend-dev npm install paquete-nombre

# Reconstruir para producción
docker-compose up -d --build frontend
```

### Ver logs de build
```bash
docker-compose logs frontend
```

## 🗂️ MinIO (Almacenamiento)

### Acceder a la consola web
```
http://localhost:9001
Usuario: minioadmin
Password: minioadmin123
```

### Listar buckets con mc client
```bash
docker-compose exec minio mc ls myminio
```

### Copiar archivo a MinIO
```bash
docker-compose exec minio mc cp /ruta/archivo myminio/media/
```

## 📧 Mailhog (Email Testing)

### Ver emails capturados
```
http://localhost:8025
```

### Limpiar todos los emails
```bash
# Reiniciar Mailhog
docker-compose restart mailhog
```

## 🔧 Mantenimiento

### Ver uso de recursos
```bash
docker stats
```

### Ver espacio usado por Docker
```bash
docker system df
```

### Limpiar imágenes no usadas
```bash
docker image prune -a
```

### Limpiar volúmenes no usados
```bash
docker volume prune
```

### Limpiar todo (¡CUIDADO!)
```bash
# Detener y eliminar todo
docker-compose down -v

# Limpiar sistema Docker
docker system prune -a --volumes
```

### Ver logs del daemon de Docker
```bash
# Windows
Get-EventLog -LogName Application -Source Docker -Newest 50

# Linux/Mac
journalctl -u docker.service
```

## 🐛 Debugging

### Entrar a un contenedor
```bash
# Backend
docker-compose exec backend sh

# Frontend (desarrollo)
docker-compose -f docker-compose.dev.yml exec frontend-dev sh

# Base de datos
docker-compose exec db sh
```

### Ver variables de entorno de un servicio
```bash
docker-compose exec backend env
```

### Inspeccionar un contenedor
```bash
docker inspect portal_capacitaciones_backend
```

### Ver procesos dentro de un contenedor
```bash
docker-compose exec backend ps aux
```

### Copiar archivos desde/hacia contenedor
```bash
# Desde contenedor a host
docker cp portal_capacitaciones_backend:/app/media/archivo.pdf ./

# Desde host a contenedor
docker cp ./archivo.pdf portal_capacitaciones_backend:/app/media/
```

## 🔍 Troubleshooting

### Backend no conecta a DB
```bash
# 1. Verificar que DB esté levantado
docker-compose ps db

# 2. Ver logs de DB
docker-compose logs db

# 3. Testear conexión desde backend
docker-compose exec backend python -c "
import psycopg2
try:
    conn = psycopg2.connect(
        dbname='portal_capacitacion',
        user='postgres',
        password='postgres_password',
        host='db',
        port='5432'
    )
    print('Conexión exitosa!')
except Exception as e:
    print(f'Error: {e}')
"
```

### Puerto ya en uso
```bash
# Ver qué proceso usa el puerto (Windows)
netstat -ano | findstr :8000

# Matar proceso
taskkill /PID <PID> /F
```

### Volúmenes corruptos
```bash
# Detener todo
docker-compose down

# Eliminar volúmenes
docker-compose down -v

# Volver a crear
docker-compose up -d --build
```

### Reconstruir desde cero
```bash
# Eliminar todo
docker-compose down -v --remove-orphans

# Limpiar caché de build
docker builder prune -a

# Reconstruir
docker-compose up -d --build
```

## 📊 Monitoreo

### Ver métricas en tiempo real
```bash
docker stats
```

### Ver uso de red
```bash
docker network inspect portal_network
```

### Ver uso de volúmenes
```bash
docker volume ls
docker volume inspect portal_capacitaciones_postgres_data
```

### Health check manual
```bash
# Backend
curl http://localhost:8000/api/

# Frontend
curl http://localhost:3000

# MinIO
curl http://localhost:9000/minio/health/live

# Mailhog
curl http://localhost:8025
```

## 🔄 Actualización

### Actualizar imágenes base
```bash
# Pull nuevas versiones
docker-compose pull

# Reconstruir con nuevas bases
docker-compose up -d --build
```

### Actualizar un servicio específico
```bash
docker-compose up -d --build backend
```

## 💾 Backup y Restore

### Backup completo
```bash
# Crear directorio
mkdir backup

# Backup de base de datos
docker-compose exec db pg_dump -U postgres portal_capacitacion > backup/db.sql

# Backup de MinIO (archivos)
docker run --rm -v portal_capacitaciones_minio_data:/data -v ${PWD}/backup:/backup alpine tar czf /backup/minio.tar.gz -C /data .

# Backup de media files
docker run --rm -v portal_capacitaciones_backend_media:/data -v ${PWD}/backup:/backup alpine tar czf /backup/media.tar.gz -C /data .
```

### Restore completo
```bash
# Restaurar base de datos
docker-compose exec -T db psql -U postgres -d portal_capacitacion < backup/db.sql

# Restaurar MinIO
docker run --rm -v portal_capacitaciones_minio_data:/data -v ${PWD}/backup:/backup alpine tar xzf /backup/minio.tar.gz -C /data

# Restaurar media files
docker run --rm -v portal_capacitaciones_backend_media:/data -v ${PWD}/backup:/backup alpine tar xzf /backup/media.tar.gz -C /data
```

## 🚦 Scripts Útiles

Los siguientes scripts están disponibles en la raíz del proyecto:

- `start.bat` - Inicia el proyecto (interactivo)
- `stop.bat` - Detiene todos los servicios
- `health-check.bat` - Verifica el estado de los servicios

## 📝 Comandos del Makefile

Si tienes Make instalado:

```bash
make help              # Ver todos los comandos
make up                # Levantar servicios
make down              # Detener servicios
make logs              # Ver logs
make shell             # Entrar al backend
make migrate           # Ejecutar migraciones
make superuser         # Crear superusuario
make test              # Ejecutar tests
```

## 🔐 Seguridad

### Cambiar contraseñas en producción
```bash
# Editar docker-compose.yml o usar .env
# Luego recrear servicios
docker-compose up -d --force-recreate
```

### Generar SECRET_KEY de Django
```bash
docker-compose exec backend python -c "
from django.core.management.utils import get_random_secret_key
print(get_random_secret_key())
"
```

## 🌐 URLs de Acceso

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000/api
- **Admin Django**: http://localhost:8000/admin
- **MinIO Console**: http://localhost:9001
- **MinIO API**: http://localhost:9000
- **Mailhog UI**: http://localhost:8025
- **PostgreSQL**: localhost:5432

## 💡 Tips

1. Usa `docker-compose -f docker-compose.dev.yml` para desarrollo
2. Usa `docker-compose.yml` para producción local
3. Los logs están en tiempo real con `-f`
4. Usa `--build` cuando cambies dependencias
5. Los volúmenes persisten datos entre reinicios
6. `docker-compose down -v` elimina TODOS los datos

## 📚 Más Información

- Ver `README.md` para guía completa
- Ver `DOCKER_ARCHITECTURE.md` para arquitectura detallada
- Documentación oficial: https://docs.docker.com/
