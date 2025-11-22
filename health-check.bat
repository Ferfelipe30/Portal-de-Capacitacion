@echo off
REM Script para verificar el estado de los servicios

echo ========================================
echo Portal de Capacitaciones - Health Check
echo ========================================
echo.

echo Verificando servicios de Docker Compose...
echo.

docker-compose ps

echo.
echo ========================================
echo Verificando conectividad de servicios
echo ========================================
echo.

echo [Frontend] Verificando http://localhost:3000
curl -s -o NUL -w "Status: %%{http_code}\n" http://localhost:3000 2>NUL
if %errorlevel% neq 0 echo [ERROR] No se puede conectar al frontend

echo.
echo [Backend API] Verificando http://localhost:8000/api
curl -s -o NUL -w "Status: %%{http_code}\n" http://localhost:8000/api 2>NUL
if %errorlevel% neq 0 echo [ERROR] No se puede conectar al backend

echo.
echo [MinIO] Verificando http://localhost:9000
curl -s -o NUL -w "Status: %%{http_code}\n" http://localhost:9000/minio/health/live 2>NUL
if %errorlevel% neq 0 echo [ERROR] No se puede conectar a MinIO

echo.
echo [Mailhog] Verificando http://localhost:8025
curl -s -o NUL -w "Status: %%{http_code}\n" http://localhost:8025 2>NUL
if %errorlevel% neq 0 echo [ERROR] No se puede conectar a Mailhog

echo.
echo ========================================
echo Health check completado
echo ========================================
echo.

pause
