# Rolling Update

rolllout command

```bash
kubectl rollout status deployment/myapp-deployment

kubectl rollout history deployment/myapp-deployment
```

rolling update

```bash
kubectl get replicasets
```

this will show old and new version of deployments during the upgrade

rollback

```bash
kubectl rollout undo deployment/myapp-deployment
```

summarized commands

```bash
kubectl create -f deployment-definition.yml
kubectl get deployments
kubectl apply -f deployment-definition.yml
kubectl set image deployment/myapp-deployment nginx=nginx:1.9.1
kubectl rollout status deployment/myapp-deployment
kubectl rollout history deployment/myapp-deployment
kubectl rollout undo deployment/myapp-deployment
```

deployment

```yaml
spec:
  replicas: {{ .Values.replicaCount}}
  selector:
    matchLabels:
      k8s-app: {{ .Values.metadata.name }}
  strategy:
    rollingUpdate:
      maxSurge: 25%
      maxUnavailable: 25%
    type: RollingUpdate
```