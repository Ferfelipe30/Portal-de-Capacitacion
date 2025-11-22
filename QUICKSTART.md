# 🚀 Guía de Inicio Rápido - Portal de Capacitaciones

## ⚡ Inicio en 3 pasos

### 1️⃣ Prerequisitos

Asegúrate de tener instalado:
- ✅ [Docker Desktop](https://www.docker.com/products/docker-desktop) para Windows

### 2️⃣ Clonar y preparar

```bash
# Si aún no lo has hecho, clona el repositorio
git clone https://github.com/Ferfelipe30/Portal-de-Capacitacion.git
cd "Portal de Capacitaciones"
```

### 3️⃣ Iniciar

#### Opción A: Usar el script de inicio (Recomendado)

Haz doble clic en `start.bat` o ejecuta:

```bash
start.bat
```

El script te preguntará si quieres usar el modo desarrollo o producción.

#### Opción B: Comando manual

**Desarrollo (con hot-reload):**
```bash
docker-compose -f docker-compose.dev.yml up --build
```

**Producción:**
```bash
docker-compose up -d --build
```

## 🌐 Acceder a la aplicación

Una vez que los contenedores estén corriendo:

| Servicio | URL | Credenciales |
|----------|-----|--------------|
| **Frontend** | http://localhost:3000 | - |
| **Backend API** | http://localhost:8000/api | - |
| **Admin Django** | http://localhost:8000/admin | Crear superusuario ⬇️ |
| **MinIO Console** | http://localhost:9001 | minioadmin / minioadmin123 |
| **Mailhog** | http://localhost:8025 | - |

## 👤 Crear Superusuario

Para acceder al admin de Django:

```bash
docker-compose exec backend python manage.py createsuperuser
```

Sigue las instrucciones para crear tu usuario administrador.

## 📋 Comandos Útiles

### Ver logs
```bash
# Todos los servicios
docker-compose logs -f

# Solo backend
docker-compose logs -f backend
```

### Detener servicios
```bash
docker-compose down
```

### Reiniciar un servicio
```bash
docker-compose restart backend
```

### Ejecutar migraciones
```bash
docker-compose exec backend python manage.py migrate
```

### Acceder al shell de Django
```bash
docker-compose exec backend python manage.py shell
```

### Ver estado de los servicios
```bash
docker-compose ps
```

## 🐛 Solución de Problemas

### El backend no inicia

```bash
# Ver los logs
docker-compose logs backend

# Verificar que la base de datos esté corriendo
docker-compose ps db

# Reiniciar todo
docker-compose down
docker-compose up -d --build
```

### Puerto ya en uso

Si dice que el puerto 8000 o 3000 ya está en uso:

```bash
# Ver qué proceso usa el puerto
netstat -ano | findstr :8000

# Matar el proceso (reemplaza <PID> con el número que te dio)
taskkill /PID <PID> /F
```

### Los cambios no se reflejan

En **desarrollo**, los cambios deberían reflejarse automáticamente.

Si usas **producción**, necesitas reconstruir:

```bash
docker-compose up -d --build
```

### Limpiar todo y empezar de nuevo

⚠️ **CUIDADO**: Esto borrará todos los datos!

```bash
docker-compose down -v
docker-compose up -d --build
```

## 📚 Más Información

- **Comandos detallados**: Ver `DOCKER_COMMANDS.md`
- **Arquitectura**: Ver `DOCKER_ARCHITECTURE.md`
- **README completo**: Ver `README.md`

## 💡 Tips

1. **Desarrollo**: Usa `docker-compose.dev.yml` para hot-reload
2. **Producción**: Usa `docker-compose.yml` para el build optimizado
3. **Logs**: Siempre revisa los logs si algo no funciona
4. **Datos**: Los datos persisten en volúmenes Docker entre reinicios
5. **Scripts**: Usa `start.bat`, `stop.bat` y `health-check.bat` para facilitar

## 🎯 Próximos Pasos

1. ✅ Iniciar los servicios
2. ✅ Crear un superusuario
3. ✅ Acceder al admin en http://localhost:8000/admin
4. ✅ Acceder al frontend en http://localhost:3000
5. 🚀 ¡Comenzar a desarrollar!

## 🆘 Ayuda

Si tienes problemas:

1. Verifica que Docker Desktop esté corriendo
2. Revisa los logs: `docker-compose logs -f`
3. Prueba el health check: `health-check.bat`
4. Consulta `DOCKER_COMMANDS.md` para más comandos
5. Reinicia Docker Desktop si todo lo demás falla

---

**¿Preguntas?** Revisa la documentación completa en `README.md`
