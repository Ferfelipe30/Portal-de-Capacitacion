@echo off
REM Script para detener los servicios Docker

echo ========================================
echo Portal de Capacitaciones - Detener
echo ========================================
echo.

echo Deteniendo servicios...
docker-compose -f docker-compose.yml down
docker-compose -f docker-compose.dev.yml down

echo.
echo Servicios detenidos correctamente!
echo.

pause
