# Liveness and Readiness Probe (Observability)

## Readiness Probes

It determines the pod indeed ready, when pod is created and start.

http test - /api/ready

```yaml
apiVersion: v1
kind: Pod
metadata:
    name: simple-webapp
    labels:
        name: simple-webapp
spec:
    containers:
    - name: simple-webapp
      image: simple-webapp
      ports:
        - containerPort: 8080
      readinessProbe:
        httpGet:
            path: /api/ready
            port: 8080
        initialDelaySeconds: 10
        periodSeconds: 5
        failureThreshold: 8
```

tcp test - 3306

```yaml
readinessProbe:
    tcpSocket:
        port: 3306
```

Exec command

```yaml
readinessProbe:
    exec:
        command:
            - cat
            - /app/is_ready
```

## Liveness Probes

Check container (app) health status

## Appendix

The **liveness probes** are to check if the container is started and alive. If this isn’t the case, kubernetes will eventually restart the container.

The **readiness probes** in turn also check dependencies like database connections or other services your container is depending on to fulfill it’s work. As a developer you have to invest here more time into the implementation than just for the liveness probes. You have to expose an endpoint which is also checking the mentioned dependencies when queried.

Your current configuration uses a health endpoint which are usually used by liveness probes. It probably doesn’t check if your services is really ready to take traffic.

Kubernetes relies on the readiness probes. During a rolling update, it will keep the old container up and running until the new service declares that it is ready to take traffic. Therefore the readiness probes have to be implemented correctly.

**livenessProbe**: Indicates whether the Container is running. If the liveness probe fails, the kubelet kills the Container, and the Container is subjected to its restart policy. If a Container does not provide a liveness probe, the default state is Success.

**readinessProbe**: Indicates whether the Container is ready to service requests. If the readiness probe fails, the endpoints controller removes the Pod’s IP address from the endpoints of all Services that match the Pod. The default state of readiness before the initial delay is Failure. If a Container does not provide a readiness probe, the default state is Success.

**startupProbe**: Indicates whether the application within the Container is started. All other probes are disabled if a startup probe is provided, until it succeeds. If the startup probe fails, the kubelet kills the Container, and the Container is subjected to its restart policy. If a Container does not provide a startup probe, the default state is Success