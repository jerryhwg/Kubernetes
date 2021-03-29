# Kubernetes

* Runs containerized applications across a cluster of machines
* Manage applications - scaling, rolling upgrades
* Adds resilience to applications - restarting failed workloads
* Connects applications - internal service discovery and load balancing
* Container scheduling, load balancing, service discovery, scaling, monitoring and logging, identity, security

## Architure and Network Basics

* [arch_network.md](arch_network.md)

## Troubleshooting

* [k8s_debug.md](k8s_debug.md)

## Topics

### [configmap](configmap.md)

### [deployment](deployment.md)

### [dns](dns.md)

### [HPA](hpa.md)

### [Ingress](simplek8s/ingress.md)

### [json path](json_path.md)

### [label selector annotation](label_selector_annotation.md)

### [liveness & readiness probe](liveness_readiness.md)

### [node affinity](node_affinity.md)

### [pods](pods.md)

### [ReplicaSets](resource.md)

### [resource](resource.md)

### [rolling update](rollingUpdate.md)

### [secret](secret.md)

### [security](secret.md)

### [taint tolerance](taint_toleration.md)

### [volumes](volumes.md)

## Useful commands

```bash
kubectl get ... -o wide
kubectl get ... -o yaml
kubectl get ... -o json
# print only resource name
kubectl get ... -o name
```

```bash
kubectl create namespace test-123 --dry-run -o json
kubectl create namespace test-123 --dry-run -o yaml
```
