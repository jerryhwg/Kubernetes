# ConfigMap

## ENV vs. ConfigMap

```yaml
env:
    - name: APP_COLOR
      value: pink
```

ConfigMap

```yaml
env:
    - name: APP_COLOR
      valueFrom:
        configMapKeyRef:
```

Secret

```yaml
env:
    - name: APP_COLOR
      valueFrom:
        secretKeyRef:
```

## ConfigMap

imperative # 1

```bash
kubectl create configmap <config-name> --from-literal=<key>=<value>
```

ex

```bash
kubectl create configmap app-config --from-liternal=APP_COLOR=blue --from-liternal=APP_MOD=prod
```

imperative # 2 (pointing to a file)

```bash
kubectl create configmap <config-name> --from-file=<path-to-file>
```

ex

```bash
kubectl create configmap app-config --from-file=app_config.properties
```

declarative

config-map.yaml

```yaml
apiVersion: v1
kind: Config
metadata:
    name: app-config
data:
    APP_COLOR: blue
    APP_MODE: prod
```

```bash
kubectl create -f config-map.yaml
```

if more configs are needed

mysql-config

```yaml
port: 3306
max_allowed_packet: 128M
```

redis-config


```yaml
port: 6379
rdb-compression: yes
```

injecting configmap in pods # 1

config-map.yaml

```yaml
apiVersion: v1
kind: Config
metadata:
    name: app-config
data:
    APP_COLOR: blue
    APP_MODE: prod
```

pod-definition.yaml

```yaml
apiVersion: v1
kind: Pod
metadata:
spec:
    containers:
    - name: 
      image:
      ports:
      envFrom:
        - configMapRef:
            name: app-config
```

injecting configmap in pods # 2

```yaml
env:
    - name: APP_COLOR
      valueFrom:
        configMapKeyRef:
            name: app-config
            key: APP_COLOR
```

injecting configmap in pods # 3 (using volume)

```yaml
volumes:
- name: app-config-volume
  configMap:
    name: app-config
```

`NOTE`: Only the **key** will come from **gitConfigmap** in **values file** `values.yaml` and conducktor will use values from [configmap](_configmapV2.yaml) that rendered **.Values.gitConfigmaps**.

view configmaps

```bash
kubectl get configmaps
kubectl describe configmaps
```

