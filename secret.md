# Secret

Create secret # 1 (imperative)

```bash
kubectl create secret generic <secret-name> --from-literal=<key>=<value>
```

ex

```bash
kubectl create secret generic app-secret --from-liternal=DB_Host=mysql --from-liternal=DB_User=root --from-liternal=DB_Password=paswrd
```

Create secret # 2 (imperative)

```bash
kubectl create secret generic <secret-name> --from-file=<path-to-file>
```

ex

```bash
kubectl create secret generic app-secret --from-file=app_secret.properties
```

Create secret # 3 (declarative)

secret-data.yaml

```yaml
apiVersion: v1
kind: Secret
metadata:
    name: app-secret
data:
    DB_HOST: mysql
    DB_User: z
    DB_Password: x
```

```bash
kubectl create -f secret-data.yaml
```

Injecting secret in Pods

pod-definition.yaml

```yaml
spec:
    containers:
    - name:
      image:
      ports:
      envFrom:
        - secretRef:
            name: app-secret
```

option # 1

```yaml
envFrom:
    -secretRef:
        name: app-secret
```

option # 2

```yaml
env:
    - name: DB_password
      valueFrom:
        secretKeyRef:
            name: app-secret
            key: DB_Password
```

option # 3

```yaml
volumes:
- name: app-secret-volume
  secret:
    secretName: app-secret
```

View secrets

```bash
kubectl get secrets

kubectl describe secrets
```