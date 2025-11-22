# Arquitectura Docker - Portal de Capacitaciones

## 📋 Visión General

Este documento describe la arquitectura de containerización del proyecto Portal de Capacitaciones.

## 🏗️ Arquitectura de Servicios

```
┌─────────────────────────────────────────────────────────────┐
│                     Docker Network                          │
│                   (portal_network)                          │
│                                                             │
│  ┌──────────┐    ┌──────────┐    ┌──────────┐            │
│  │ Frontend │◄───┤  Nginx   │    │ Backend  │            │
│  │  React   │    │  (Prod)  │◄───┤  Django  │            │
│  │  + Vite  │    └──────────┘    │  + DRF   │            │
│  └──────────┘                     └─────┬────┘            │
│      :3000                               │                 │
│      :80                                 │                 │
│                                          │                 │
│                    ┌─────────────────────┼─────────────┐   │
│                    │                     │             │   │
│              ┌─────▼────┐         ┌─────▼────┐   ┌────▼──┐│
│              │PostgreSQL│         │  MinIO   │   │Mailhog││
│              │   :5432  │         │  :9000   │   │ :1025 ││
│              └──────────┘         │  :9001   │   │ :8025 ││
│                                   └──────────┘   └───────┘│
└─────────────────────────────────────────────────────────────┘
```

## 🐳 Servicios Docker

### 1. Frontend (React + Vite)

**Imagen Base:** `node:20-alpine` (desarrollo) / `nginx:alpine` (producción)

**Puertos Expuestos:**
- Desarrollo: `5173:5173`
- Producción: `80:80`, `443:443`

**Características:**
- Build multi-stage para optimización
- Nginx configurado para React Router (SPA)
- Compresión Gzip habilitada
- Headers de seguridad configurados
- Cache de assets estáticos (1 año)

**Archivos:**
- `frontend/Dockerfile` - Producción con Nginx
- `frontend/nginx.conf` - Configuración Nginx
- `frontend/.dockerignore` - Exclusiones de build

### 2. Backend (Django + DRF)

**Imagen Base:** `python:3.11-slim`

**Puertos Expuestos:** `8000:8000`

**Características:**
- Build multi-stage para reducir tamaño
- Django development server (desarrollo)
- Gunicorn con 4 workers (producción)
- Migraciones automáticas en inicio
- Health checks configurados

**Archivos:**
- `backend/Dockerfile` - Desarrollo
- `backend/Dockerfile.prod` - Producción con Gunicorn
- `backend/requirements.txt` - Dependencias Python
- `backend/.dockerignore` - Exclusiones de build

### 3. PostgreSQL

**Imagen:** `postgres:16-alpine`

**Puerto:** `5432:5432`

**Características:**
- Volumen persistente para datos
- Health checks configurados
- Auto-creación de base de datos

**Variables de Entorno:**
- `POSTGRES_DB`: Nombre de la base de datos
- `POSTGRES_USER`: Usuario de PostgreSQL
- `POSTGRES_PASSWORD`: Contraseña

### 4. MinIO (Almacenamiento S3-compatible)

**Imagen:** `minio/minio:latest`

**Puertos:**
- `9000:9000` - API
- `9001:9001` - Consola Web

**Características:**
- Compatible con AWS S3
- Bucket `media` auto-creado
- Consola web para gestión
- Permisos públicos para lectura

**Credenciales por defecto:**
- Usuario: `minioadmin`
- Contraseña: `minioadmin123`

### 5. Mailhog (Email Testing)

**Imagen:** `mailhog/mailhog:latest`

**Puertos:**
- `1025:1025` - SMTP
- `8025:8025` - Web UI

**Características:**
- Captura todos los emails enviados
- Interfaz web para visualizar emails
- No requiere configuración
- Solo para desarrollo

## 📦 Volúmenes Docker

### Volúmenes Persistentes

```yaml
postgres_data:     # Datos de PostgreSQL
minio_data:        # Archivos de MinIO
backend_media:     # Media files de Django
backend_static:    # Archivos estáticos (producción)
```

### Volúmenes de Desarrollo

En modo desarrollo, se montan los directorios del código fuente:

```yaml
./backend:/app           # Backend con hot-reload
./frontend:/app          # Frontend con hot-reload
/app/node_modules        # Node modules anónimo
```

## 🌐 Redes Docker

### Red Principal: `portal_network`

Todos los servicios se comunican a través de esta red bridge.

**Resolución DNS:**
- `db` → PostgreSQL
- `backend` → Django
- `minio` → MinIO
- `mailhog` → Mailhog
- `frontend` → Frontend (producción)

## 🔧 Configuraciones Docker Compose

### docker-compose.yml (Producción)

- Django con runserver
- Frontend con Nginx
- Todos los servicios con restart policy
- Health checks configurados

### docker-compose.dev.yml (Desarrollo)

- Hot-reload para backend y frontend
- Vite dev server para frontend
- Volúmenes montados para código
- Logs verbosos

### docker-compose.prod.yml (Producción Optimizada)

- Gunicorn para Django
- Variables de entorno desde `.env`
- Sin servicios de desarrollo (Mailhog)
- Optimizaciones de rendimiento

## 🚀 Flujo de Inicio

### Orden de Inicio

1. **PostgreSQL** - Espera health check
2. **MinIO** - Espera health check
3. **MinIO Init** - Crea bucket
4. **Mailhog** - Inicia
5. **Backend** - Espera DB y MinIO, ejecuta migraciones
6. **Frontend** - Espera backend

### Health Checks

Cada servicio crítico tiene un health check:

```yaml
healthcheck:
  test: ["CMD-SHELL", "comando"]
  interval: 30s
  timeout: 10s
  retries: 3
  start_period: 40s
```

## 🔐 Seguridad

### Recomendaciones de Producción

1. **Cambiar todas las contraseñas por defecto**
2. **Usar secrets de Docker** para credenciales sensibles
3. **Configurar HTTPS** con certificados SSL
4. **Limitar exposición de puertos** (solo 80/443)
5. **Usar registry privado** para imágenes
6. **Implementar escaneo de vulnerabilidades**
7. **Configurar rate limiting** en Nginx
8. **Habilitar logs centralizados**

### Variables de Entorno Sensibles

```
SECRET_KEY              # Django secret key
DB_PASSWORD             # PostgreSQL password
MINIO_SECRET_KEY        # MinIO credentials
EMAIL_HOST_PASSWORD     # Email credentials
```

## 📊 Recursos y Límites

### Desarrollo

Sin límites configurados para facilitar el desarrollo.

### Producción (Recomendado)

```yaml
deploy:
  resources:
    limits:
      cpus: '2'
      memory: 2G
    reservations:
      cpus: '1'
      memory: 512M
```

## 🔍 Monitoreo

### Logs

```bash
# Todos los servicios
docker-compose logs -f

# Servicio específico
docker-compose logs -f backend

# Últimas 100 líneas
docker-compose logs --tail=100 backend
```

### Estado de Servicios

```bash
# Ver contenedores
docker-compose ps

# Verificar health
docker-compose ps backend

# Estadísticas de recursos
docker stats
```

## 🛠️ Troubleshooting

### Problemas Comunes

**1. Backend no conecta a PostgreSQL**
```bash
# Verificar que DB esté healthy
docker-compose ps db

# Ver logs de DB
docker-compose logs db

# Reiniciar servicio
docker-compose restart db
```

**2. Permisos de volúmenes**
```bash
# En Windows, verificar que Docker Desktop tenga acceso
# Settings → Resources → File Sharing
```

**3. Puerto ya en uso**
```bash
# Windows: Ver qué proceso usa el puerto
netstat -ano | findstr :8000

# Detener proceso
taskkill /PID <PID> /F
```

**4. Imágenes desactualizadas**
```bash
# Reconstruir sin cache
docker-compose build --no-cache
```

## 📈 Optimizaciones

### Build Cache

El Dockerfile usa multi-stage builds para:
- Reducir tamaño final de imagen
- Mejorar velocidad de builds
- Separar dependencias de código

### Network

Todos los servicios usan una red bridge para:
- Comunicación interna rápida
- Aislamiento de red externa
- Resolución DNS automática

### Volúmenes

Los volúmenes persistentes aseguran:
- Datos sobreviven a reinicios
- Performance mejorada vs bind mounts
- Backup y restauración simplificados

## 🔄 CI/CD

### GitHub Actions (Ejemplo)

```yaml
name: Docker Build and Push

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Build images
        run: docker-compose build
      - name: Run tests
        run: docker-compose run backend python manage.py test
```

## 📚 Referencias

- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Django Deployment](https://docs.djangoproject.com/en/stable/howto/deployment/)
- [Nginx Configuration](https://nginx.org/en/docs/)
- [PostgreSQL Docker](https://hub.docker.com/_/postgres)
- [MinIO Documentation](https://min.io/docs/minio/linux/index.html)
