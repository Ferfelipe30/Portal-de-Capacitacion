# Portal de Capacitaciones

Sistema completo de gestión de capacitaciones con Django REST Framework y React + TypeScript.

## 🐳 Dockerización

Este proyecto está completamente dockerizado e incluye:

- **Backend**: Django REST Framework con PostgreSQL
- **Frontend**: React + Vite + TypeScript con Nginx
- **Base de datos**: PostgreSQL 16
- **Almacenamiento**: MinIO (S3-compatible)
- **Email testing**: Mailhog

## 🚀 Inicio Rápido

### Prerrequisitos

- Docker Desktop instalado
- Docker Compose v2.0+

### Levantar el proyecto

```bash
# Construir y levantar todos los servicios
docker-compose up --build

# O en modo detached (background)
docker-compose up -d --build
```

### Acceder a los servicios

Una vez levantados los contenedores:

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000/api
- **Admin Django**: http://localhost:8000/admin
- **MinIO Console**: http://localhost:9001 (minioadmin / minioadmin123)
- **Mailhog UI**: http://localhost:8025

### Comandos útiles

```bash
# Ver logs de todos los servicios
docker-compose logs -f

# Ver logs de un servicio específico
docker-compose logs -f backend
docker-compose logs -f frontend

# Detener los servicios
docker-compose down

# Detener y eliminar volúmenes (¡CUIDADO! Borra la BD)
docker-compose down -v

# Reconstruir un servicio específico
docker-compose up -d --build backend

# Ejecutar comandos en el backend
docker-compose exec backend python manage.py createsuperuser
docker-compose exec backend python manage.py migrate
docker-compose exec backend python manage.py makemigrations

# Acceder al shell de Django
docker-compose exec backend python manage.py shell

# Acceder a la base de datos
docker-compose exec db psql -U postgres -d portal_capacitacion
```

## 📁 Estructura del Proyecto

```
Portal de Capacitaciones/
├── backend/
│   ├── api/                    # Aplicación Django
│   ├── backend/               # Configuración Django
│   ├── Dockerfile
│   ├── requirements.txt
│   └── .dockerignore
├── frontend/
│   ├── src/                   # Código fuente React
│   ├── public/                # Archivos estáticos
│   ├── Dockerfile
│   ├── nginx.conf            # Configuración Nginx
│   └── .dockerignore
├── docker-compose.yml         # Orquestación de servicios
└── README.md
```

## 🔧 Configuración

### Variables de entorno

El archivo `docker-compose.yml` contiene todas las variables de entorno necesarias. Para producción, se recomienda:

1. Crear archivos `.env` separados para backend y frontend
2. Cambiar las contraseñas y claves secretas
3. Configurar `DEBUG=False` en el backend
4. Actualizar `ALLOWED_HOSTS` y `CORS_ALLOWED_ORIGINS`

### Base de datos

Las migraciones se ejecutan automáticamente al levantar el backend. Para crear un superusuario:

```bash
docker-compose exec backend python manage.py createsuperuser
```

### Almacenamiento de archivos (MinIO)

MinIO se inicializa automáticamente con un bucket llamado `media`. Los archivos subidos estarán disponibles en:
- Endpoint API: http://localhost:9000
- Consola web: http://localhost:9001

## 🛠️ Desarrollo

### Backend (Django)

El código del backend se monta como volumen, por lo que los cambios se reflejan automáticamente.

```bash
# Instalar nuevas dependencias
docker-compose exec backend pip install nombre-paquete
# Actualizar requirements.txt después
docker-compose exec backend pip freeze > requirements.txt
```

### Frontend (React)

Para desarrollo, puedes usar el servidor de desarrollo de Vite en lugar del contenedor:

```bash
cd frontend
npm install
npm run dev
```

## 📦 Producción

Para producción, considera:

1. **Usar un servidor WSGI real** (Gunicorn):
   ```dockerfile
   CMD ["gunicorn", "backend.wsgi:application", "--bind", "0.0.0.0:8000"]
   ```

2. **Servir archivos estáticos** con Nginx o CDN

3. **Usar PostgreSQL gestionado** (AWS RDS, Google Cloud SQL)

4. **Configurar HTTPS** con Let's Encrypt

5. **Implementar logs centralizados**

6. **Usar variables de entorno seguras**

## 🐛 Troubleshooting

### El backend no se conecta a la base de datos

Asegúrate de que el servicio `db` esté healthy:
```bash
docker-compose ps
docker-compose logs db
```

### Error de permisos en volúmenes

En Windows, asegúrate de que Docker Desktop tenga acceso a la carpeta del proyecto.

### El frontend no puede conectarse al backend

Verifica que la variable `VITE_API_URL` en el docker-compose apunte correctamente al backend.

## 📄 Licencia

Este proyecto es privado y confidencial.

Sistema web completo para gestión de capacitaciones con frontend en React y backend en Django.

## 📋 Descripción

Portal de Capacitaciones es una aplicación web full-stack diseñada para gestionar cursos, formaciones y capacitaciones. Permite administrar usuarios, contenidos educativos y realizar seguimiento del progreso de aprendizaje.

## 🚀 Tecnologías

### Frontend
- **React** con TypeScript
- **Vite** - Build tool y dev server
- CSS modular

### Backend
- **Django** - Framework web
- **Django REST Framework** - API REST
- Python 3.x

## 📁 Estructura del Proyecto
Portal de Capacitaciones/
├── frontend/ # Aplicación React
│ ├── src/
│ │ ├── App.tsx
│ │ ├── main.tsx
│ │ └── assets/
│ ├── public/
│ └── package.json
│
└── backend/ # API Django
├── api/ # App principal de la API
│ ├── models.py
│ ├── serializers.py
│ ├── views.py
│ └── urls.py
├── backend/ # Configuración del proyecto
│ ├── settings.py
│ └── urls.py
└── manage.py


## 🛠️ Instalación

### Requisitos Previos
- Node.js (v16 o superior)
- Python 3.8+
- pip

### Backend (Django)

```bash
# Navegar a la carpeta backend
cd backend

# Crear entorno virtual
python -m venv venv

# Activar entorno virtual
# En Windows:
venv\Scripts\activate
# En Linux/Mac:
source venv/bin/activate

# Instalar dependencias
pip install django djangorestframework django-cors-headers

# Ejecutar migraciones
python manage.py migrate

# Iniciar servidor
python manage.py runserver

El backend estará disponible en http://localhost:8000/

```

### Frontend (React)

```bash
# Navegar a la carpeta frontend
cd frontend

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

El frontend estará disponible en http://localhost:5173/

```

