@echo off
setlocal
set NAMESPACE=portal-capacitaciones

echo =============================================
echo Eliminando Namespace %NAMESPACE%
echo =============================================

kubectl get ns %NAMESPACE% >nul 2>&1
if %errorlevel% neq 0 (
  echo [INFO] El namespace %NAMESPACE% no existe.
  exit /b 0
)

echo [WARN] Esto borrará TODOS los recursos y volúmenes (PVC) del namespace.
set /p AREYOUSURE="Escribe YES para continuar: "
if /I NOT "%AREYOUSURE%"=="YES" (
  echo Cancelado.
  exit /b 1
)

kubectl delete namespace %NAMESPACE%
if %errorlevel% neq 0 (
  echo [ERROR] Fallo eliminando namespace.
  exit /b 1
)

echo [OK] Namespace eliminado. Verifica con:
echo   kubectl get ns
endlocal
