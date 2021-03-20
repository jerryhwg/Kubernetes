# Resource

Events:
FailedScheduling

Message:
No nodes are available that match all of the following predicates: Insufficient cpu (3)

## Requests

```yaml
apiVersion: v1
kind: Pod
metadata:
    name: simple-webapp-color
    labels:
        name: simple-webapp-color
spec:
    conatiners:
    - name: simple-webapp-color
      image: simple-webapp-color
      ports:
        - containerPort: 8080
      resources:
        requests:
            memory: "1Gi"
            cpu: 1
```

1 CPU = 1 AWS vCPU

1G (Gigabyte) = 1,000,000,000 bytes

1Gi (Gibibyte) = 1,073,741,824 bytes

```yaml
resources:
            limits:
              cpu: {{ .Values.resources.limits.cpu }}
              memory: {{ .Values.resources.limits.memory }}
            requests:
              cpu: {{ .Values.resources.requests.cpu }}
              memory: {{ .Values.resources.requests.memory }}
```

## Limits

Default

* 1 vCPU
* 512 Mib

```yaml
apiVersion: v1
kind: Pod
metadata:
    name: simple-webapp-color
    labels:
        name: simple-webapp-color
spec:
    conatiners:
    - name: simple-webapp-color
      image: simple-webapp-color
      ports:
        - containerPort: 8080
      resources:
        requests:
            memory: "1Gi"
            cpu: 1
        limits:
            memory: "2Gi"
            cpu: 2
```

Exceed Limits

* CPU: Throttle
* Memory: Terminate