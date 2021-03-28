# Logging and Monitoring

## Logging

single container

```bash
kubectl logs -f <pod name>
```

multi-container

```bash
# list container
kubectl logs <pod name> -c
# logs for a specific container
kubectl logs -f <pod name> -c <container name>
```

## Monitoring

* Metrics server
* Prometheus
* Grafana
* Elastic Stack
* Datadog
* Dynatrac

Heapster (deprecated) ---> Metrics Server (slim down version)

One Metrics Server per one K8s cluster

Kubelet (has cAdvisor) --- data ---> Metrics Server (in-memory) 

For histrocial data, rely on Prometheus etc and for rich graphical dashboard, use Grafana

### STEPS

```bash
git clone https://github.com/kubernetes-incubator.metrics-server.git
kubectl create -f deploy/1.8+/
```

for minikube

```bash
minikube addons enable metrics-server
```

view the data

```bash
kubectl top node
kubectl top pod
```