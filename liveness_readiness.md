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

## Details

The **`liveness probes`** are to check if the container is started and alive. If this isn’t the case, kubernetes will eventually restart the container.

The **`readiness probes`** in turn also check dependencies like database connections or other services your container is depending on to fulfill it’s work. As a developer you have to invest here more time into the implementation than just for the liveness probes. You have to expose an endpoint which is also checking the mentioned dependencies when queried.

Your current configuration uses a health endpoint which are usually used by liveness probes. It probably doesn’t check if your services is really ready to take traffic.

Kubernetes relies on the readiness probes. **During a rolling update**, it will keep the old container up and running until the new service declares that it is ready to take traffic. Therefore the readiness probes have to be implemented correctly.

NOTE: Liveness probes do not wait for readiness probes to succeed. If you want to wait before executing a liveness probe you should use initialDelaySeconds or a startupProbe.

Readiness probes are configured similarly to liveness probes. The only difference is that you use the readinessProbe field instead of the livenessProbe field.

Readiness and liveness probes can be used in parallel for the same container. Using both can ensure that traffic does not reach a container that is not ready for it, and that containers are restarted when they fail.

**`livenessProbe`**: Indicates whether the Container is running. If the liveness probe fails, the kubelet kills the Container, and the Container is subjected to its restart policy. If a Container does not provide a liveness probe, the default state is Success.

**`readinessProbe`**: Indicates whether the Container is ready to service requests. If the readiness probe fails, the endpoints controller removes the Pod’s IP address from the endpoints of all Services that match the Pod. The default state of readiness before the initial delay is Failure. If a Container does not provide a readiness probe, the default state is Success.

**`startupProbe`**: Indicates whether the application within the Container is started. All other probes are disabled if a startup probe is provided, until it succeeds. It's useful to allow a legacy app to have enough time to start up. Once the startup probe has succeeded once, the liveness probe takes over to provide a fast response to container deadlocks. If the startup probe fails, the kubelet kills the Container, and the Container is subjected to its restart policy. If a Container does not provide a startup probe, the default state is Success

## Configure Probes

* `initialDelaySeconds`: Number of seconds after the container has started before liveness or readiness probes are initiated. Defaults to 0 seconds. Minimum value is 0.
* `periodSeconds`: How often (in seconds) to perform the probe. Default to 10 seconds. Minimum value is 1.
* `timeoutSeconds`: Number of seconds after which the probe times out. Defaults to 1 second. Minimum value is 1. (after kubernetes 1.20)
* `successThreshold`: Minimum consecutive successes for the probe to be considered successful after having failed. Defaults to 1. Must be 1 for liveness and startup Probes. Minimum value is 1.
* `failureThreshold`: When a probe fails, Kubernetes will try failureThreshold times before giving up. Giving up in case of liveness probe means restarting the container. In case of readiness probe the Pod will be marked Unready. Defaults to 3. Minimum value is 1.