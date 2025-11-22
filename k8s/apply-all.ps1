Param(
  [string]$Namespace = "portal-capacitaciones",
  [switch]$EnableIngress,
  [switch]$Minikube,
  [switch]$Kind
)

Write-Host "=== Portal Capacitaciones K8s Apply (PowerShell) ===" -ForegroundColor Cyan

# Check kubectl
if (-not (Get-Command kubectl -ErrorAction SilentlyContinue)) {
  Write-Host "kubectl no está instalado o no está en PATH" -ForegroundColor Red
  exit 1
}

# Optional enable ingress for minikube
if ($Minikube) {
  Write-Host "[INFO] Minikube detectado. Habilitando ingress (si no está habilitado)..." -ForegroundColor Yellow
  & minikube addons enable ingress | Out-Null
}

# Namespace ensure
$nsExists = kubectl get ns $Namespace 2>$null
if (-not $nsExists) {
  Write-Host "[INFO] Creando namespace $Namespace" -ForegroundColor Yellow
  kubectl apply -f k8s/namespace.yaml | Out-Null
}

# Order apply folders
$folders = @("postgres","minio","mailhog","backend","frontend")
foreach ($f in $folders) {
  $path = Join-Path k8s $f
  if (Test-Path $path) {
    Write-Host "[APPLY] $f" -ForegroundColor Green
    kubectl -n $Namespace apply -f $path
    if ($LASTEXITCODE -ne 0) { Write-Host "[ERROR] Fallo aplicando $f" -ForegroundColor Red; exit 1 }
  }
}

# ConfigMap & Secret (explicit)
Write-Host "[APPLY] backend config & secret" -ForegroundColor Green
kubectl -n $Namespace apply -f k8s/backend/configmap-backend.yaml
kubectl -n $Namespace apply -f k8s/backend/secret-backend.yaml

# Migrate Job
Write-Host "[APPLY] migration job" -ForegroundColor Green
kubectl -n $Namespace apply -f k8s/backend/backend-migrate-job.yaml

# Ingress
if (Test-Path k8s/ingress.yaml) {
  Write-Host "[APPLY] ingress" -ForegroundColor Green
  kubectl -n $Namespace apply -f k8s/ingress.yaml
}

# Host entry suggestion (only for local clusters)
if ($Minikube) {
  $ip = (& minikube ip).Trim()
  Write-Host "[INFO] Añade a hosts: $ip portal.local" -ForegroundColor Yellow
}
elseif ($Kind) {
  Write-Host "[INFO] KIND usado. Mapea portal.local al ingress controller node IP" -ForegroundColor Yellow
}

Write-Host "[DONE] Revisa pods: kubectl -n $Namespace get pods" -ForegroundColor Cyan
