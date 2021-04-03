# HPA (HorizontalPodAutoScaler)

HPA uses API to collect metrics from metrics server.

sample `vote-hap.yaml`

```yaml
apiVersion: autoscaling/v1
kind: HorizontalPodAutoscaler
metadata:
  name: vote
spec:
  minReplicas: 1
  maxReplicas: 10
  targetCPUUtilizationPercentage: 50
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: vote
```

```bash
kubectl autoscale deployment vote --cpu-percent=50 --min=1 --max=10
```

HAP will increase and decrease the number of replicas (via the deployment) to maintain an average CPU utlilization across all pods of 50%.

`NOTE` Autoscaling the replicas may take a few minutes.

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