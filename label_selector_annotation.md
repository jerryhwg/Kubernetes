# Labels and Selectors and Annotations

## Labels and Selectors

labels to group

selectors: help filter

Pod `pod-definition.yaml`

```yaml
apiVersion: v1
kind: Pod
metadata:
    name: simple-webapp
    labels:
        app: App1
        function: Front-end

spec:
    containers:
    - name: simple-webapp
      image: simple-webapp
      ports:
        - containerPort: 8080
```

```bash
kubectl get pods --selector app=App1
```

ReplicaSet `replicaset-definition.yaml`

```yaml
apiVersion: apps/v1
kind: ReplicaSet
metadata:
    name: simple-webapp
    labels:
        app: App1
        function: Front-end
    annotations:
        buildversion: 1.34
spec:
    replicas: 3
    selector:
        matchLabels:
            app: App1
    template:
        metadata:
            labels:
                app: App1
                function: Front-end
        spec:
            containers:
            - name: simple-webapp
              image: simple-webapp
```

label under template section -> pod label
label in the top -> replicaset label
selector matchLabel -> connect replicaset to pods

Service `service-definition.yaml`

```yaml
apiVersion: v1
kind: Service
metadata:
    name: my-service
spec:
    selector:
        app: App1 (# matching labels of pod in template section)
    ports:
    - protocol: TCP
      port: 80
      targetPort: 9376
```

selector -> connect service to pods

## Annotations