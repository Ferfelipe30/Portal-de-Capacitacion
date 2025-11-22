@echo off
REM Script de inicialización para Windows

echo ========================================
echo Portal de Capacitaciones - Inicializar
echo ========================================
echo.

REM Verificar que Docker esté instalado
docker --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Docker no esta instalado o no esta en el PATH
    echo Por favor instala Docker Desktop desde https://www.docker.com/products/docker-desktop
    pause
    exit /b 1
)

REM Verificar que Docker Compose esté disponible
docker-compose --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Docker Compose no esta disponible
    pause
    exit /b 1
)

echo [OK] Docker esta instalado correctamente
echo.

REM Preguntar qué configuración usar
echo Selecciona el modo de ejecucion:
echo 1. Desarrollo (con hot-reload)
echo 2. Produccion
echo.
set /p mode="Ingresa 1 o 2: "

if "%mode%"=="1" (
    set compose_file=docker-compose.dev.yml
    echo.
    echo [INFO] Usando configuracion de desarrollo
) else if "%mode%"=="2" (
    set compose_file=docker-compose.yml
    echo.
    echo [INFO] Usando configuracion de produccion
) else (
    echo [ERROR] Opcion invalida
    pause
    exit /b 1
)

echo.
echo Construyendo imagenes Docker...
docker-compose -f %compose_file% build

if %errorlevel% neq 0 (
    echo [ERROR] Fallo la construccion de imagenes
    pause
    exit /b 1
)

echo.
echo Levantando servicios...
docker-compose -f %compose_file% up -d

if %errorlevel% neq 0 (
    echo [ERROR] Fallo al levantar los servicios
    pause
    exit /b 1
)

echo.
echo Esperando a que los servicios esten listos...
timeout /t 15 /nobreak >nul

echo.
echo ========================================
echo Servicios levantados correctamente!
echo ========================================
echo.
echo Accede a los servicios en:
echo   Frontend:      http://localhost:3000
echo   Backend API:   http://localhost:8000/api
echo   Admin Django:  http://localhost:8000/admin
echo   MinIO Console: http://localhost:9001
echo   Mailhog UI:    http://localhost:8025
echo.
echo Para crear un superusuario de Django, ejecuta:
echo   docker-compose -f %compose_file% exec backend python manage.py createsuperuser
echo.
echo Para ver los logs:
echo   docker-compose -f %compose_file% logs -f
echo.
echo Para detener los servicios:
echo   docker-compose -f %compose_file% down
echo.

pause
