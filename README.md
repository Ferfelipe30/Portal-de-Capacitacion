# Portal de Capacitaciones

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

