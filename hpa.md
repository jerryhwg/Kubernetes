# HPA (HorizontalPodAutoScaler)

sample `vote-hap.yaml`

```yaml
apiVersion: autoscaling/v1
kind: HorizontalPodAutoscaler
metadata:
  name: vote
spec:
  minReplicas: 4
  maxReplicas: 15
  targetCPUUtilizationPercentage: 40
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: vote
```

apply

```bash
kubectl apply -f vote-app.yaml
```

validate

```bash
kubectl get hpa
kubectl describe hpa vote
kubectl get pod,deploy
```