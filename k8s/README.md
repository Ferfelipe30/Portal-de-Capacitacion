# Kubernetes Manifests - Portal de Capacitaciones

## Estructura
```
k8s/
  namespace.yaml
  ingress.yaml
  backend/
    configmap-backend.yaml
    secret-backend.yaml
    backend-deployment.yaml
    backend-service.yaml
    backend-migrate-job.yaml
  frontend/
    frontend-deployment.yaml
    frontend-service.yaml
  postgres/
    postgres-statefulset.yaml
    postgres-service.yaml
  minio/
    minio-deployment.yaml
    minio-service.yaml
  mailhog/
    mailhog-deployment.yaml
    mailhog-service.yaml
```

## Requisitos Previos
- Cluster Kubernetes (minikube, kind, k3d o cloud)
- `kubectl` instalado
- Ingress Controller (ej: NGINX Ingress)
- Registro de contenedores accesible (Docker Hub, GHCR, etc.)

## Construir y Publicar Imágenes
Backend:
```bash
docker build -t your-registry/portal-backend:latest -f backend/Dockerfile.prod backend
# o usar Dockerfile si dev
docker push your-registry/portal-backend:latest
```
Frontend:
```bash
docker build -t your-registry/portal-frontend:latest -f frontend/Dockerfile frontend
docker push your-registry/portal-frontend:latest
```

## Despliegue Básico
```bash
kubectl apply -f k8s/namespace.yaml
# (Opcional) si usas minikube: minikube addons enable ingress
kubectl -n portal-capacitaciones apply -f k8s/postgres/
kubectl -n portal-capacitaciones apply -f k8s/minio/
kubectl -n portal-capacitaciones apply -f k8s/mailhog/   # opcional en prod
kubectl -n portal-capacitaciones apply -f k8s/backend/configmap-backend.yaml
kubectl -n portal-capacitaciones apply -f k8s/backend/secret-backend.yaml
kubectl -n portal-capacitaciones apply -f k8s/backend/backend-deployment.yaml
kubectl -n portal-capacitaciones apply -f k8s/backend/backend-service.yaml
kubectl -n portal-capacitaciones apply -f k8s/frontend/
kubectl -n portal-capacitaciones apply -f k8s/ingress.yaml
```

### Script (Windows)
También puedes usar:
```bash
./k8s/apply-all.bat   # aplica todo y job de migraciones
./k8s/delete-all.bat  # elimina el namespace completo
```

### PowerShell con opciones
```powershell
./k8s/apply-all.ps1 -Minikube -EnableIngress
```

## Ejecutar Migraciones
```bash
kubectl -n portal-capacitaciones apply -f k8s/backend/backend-migrate-job.yaml
kubectl -n portal-capacitaciones logs job/backend-migrate
```

## Ver Recursos
```bash
kubectl -n portal-capacitaciones get all
kubectl -n portal-capacitaciones get pvc
kubectl -n portal-capacitaciones get ingress
```

## Acceso Local (minikube)
Agregar host:
```bash
echo "$(minikube ip) portal.local" | sudo tee -a /etc/hosts
```
Activar ingress en minikube:
```bash
minikube addons enable ingress
```

Si usas KIND:
```bash
kind create cluster --name portal
# Instalar NGINX Ingress (manualmente o via helm)
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.11.2/deploy/static/provider/kind/deploy.yaml
# Obtener IP del ingress y mapear en hosts (puede requerir port-forward):
kubectl get svc -n ingress-nginx
```

Navegar: http://portal.local

## Variables Sensibles
Editar `secret-backend.yaml` antes de producción: SECRET_KEY, DB_PASSWORD, EMAIL_HOST_PASSWORD, MINIO creds.

## Escalado
```bash
kubectl -n portal-capacitaciones scale deployment/backend --replicas=3
kubectl -n portal-capacitaciones scale deployment/frontend --replicas=3
```

## Logs & Debug
```bash
kubectl -n portal-capacitaciones logs -f deployment/backend
kubectl -n portal-capacitaciones exec -it deploy/backend -- sh
kubectl -n portal-capacitaciones describe pod <pod-name>
```

## Limpieza
```bash
kubectl delete namespace portal-capacitaciones
```

## Producción - Recomendaciones
- Usar `cert-manager` para TLS automático.
- Añadir HorizontalPodAutoscaler para backend y frontend.
- Añadir monitoreo (Prometheus + Grafana).
- Usar StorageClass redundante (cloud) para PVCs.
- Separar secretos en `External Secrets` o gestor (AWS Secrets Manager, Vault).
- Configurar ResourceQuotas y LimitRanges.
- Activar autoscaling del cluster (si cloud).

## Ejemplo HPA (backend)
```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: backend-hpa
  namespace: portal-capacitaciones
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: backend
  minReplicas: 2
  maxReplicas: 5
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 70
```

## Próximos Pasos
1. Integrar CI/CD para build & push de imágenes.
2. Añadir job para recolección de estáticos si los sirves por CDN.
3. Implementar backup de PostgreSQL (CronJob + bucket MinIO).
4. Añadir NetworkPolicies para aislar servicios.
5. Implementar HPA y métricas (metrics-server / Prometheus).
6. Usar ExternalDNS y cert-manager para dominios productivos.

## Troubleshooting
- Pods en CrashLoopBackOff: revisar logs `kubectl logs`.
- Error de conexión DB: verificar Service `postgres` y variables.
- Ingress no resuelve: confirmar Ingress Controller instalado y /etc/hosts.
- MinIO credenciales: coinciden con secret.

---
Listo: Plataforma preparada para Kubernetes.
