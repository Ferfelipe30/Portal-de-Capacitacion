@echo off
setlocal ENABLEDELAYEDEXPANSION

echo =============================================
echo Aplicando Kubernetes - Portal Capacitaciones
echo =============================================

REM Comprobar kubectl
kubectl version --client >nul 2>&1
if %errorlevel% neq 0 (
  echo [ERROR] kubectl no encontrado en PATH
  exit /b 1
)

set NAMESPACE=portal-capacitaciones

echo [INFO] Creando namespace (si no existe)...
kubectl get ns %NAMESPACE% >nul 2>&1 || kubectl apply -f k8s/namespace.yaml

REM Orden de aplicación
set ORDER=postgres minio mailhog backend frontend

for %%S in (%ORDER%) do (
  if exist k8s\%%S (
    echo ---------------------------------------------
    echo [INFO] Aplicando %%S
    echo ---------------------------------------------
    kubectl -n %NAMESPACE% apply -f k8s/%%S
    if %errorlevel% neq 0 (
      echo [ERROR] Fallo aplicando %%S
      exit /b 1
    )
  )
)

echo [INFO] Aplicando ConfigMap y Secret backend...
kubectl -n %NAMESPACE% apply -f k8s\backend\configmap-backend.yaml
kubectl -n %NAMESPACE% apply -f k8s\backend\secret-backend.yaml

REM Backend deployment y service (ya incluidos si se aplicó carpeta backend completa)

echo [INFO] Ejecutando Job de migraciones...
kubectl -n %NAMESPACE% apply -f k8s\backend\backend-migrate-job.yaml

REM Ingress
if exist k8s\ingress.yaml (
  echo [INFO] Aplicando ingress...
  kubectl -n %NAMESPACE% apply -f k8s\ingress.yaml
)

echo.
echo [INFO] Espera unos segundos y verifica pods:
echo   kubectl -n %NAMESPACE% get pods

echo [INFO] Para logs del backend:
echo   kubectl -n %NAMESPACE% logs -f deployment/backend

echo [INFO] Si usas minikube, añade al /etc/hosts:
echo   (minikube ip) portal.local

echo [OK] Aplicación completada.
endlocal
