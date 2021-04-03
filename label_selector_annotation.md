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

`Guide`

* `label` under template section -> `pod` label
* `label` in the top -> `replicaset` label
* selector `matchLabel` -> connect replicaset (or deployment) to pods

`NOTE`

1. Service `selector` should match the pod's `label` (under template:)
2. Service `targetPort` should match the `containerPort` of the Pod
3. Service `port` can be any number (because they use different IP addresses assigned)
4. The `service.port` of the Ingress should match the `port` of the Service
5. The `service.name` of the Ingress should match the `name` of the Service

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