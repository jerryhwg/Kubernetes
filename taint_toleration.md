# Taints and Tolerations

Node 1: **Taint**=blue

Pod D: **Toleration**=blue

Taints - Node

```bash
kubectl taint nodes node-name key=value:taint-effect
```

ex

```bash
kubectl taint nodes node1 app=blue:NoSchedule
```

What happens to Pods that do not tolerate this taint

* NoSchedule
* PreferNoSchedule
* NoExecute

Tolerations - Pods

pod-definition.yml

```yaml
apiVersion:
kind: Pod
metadata:
    name: myapp-pod
spec:
    containers:
    - name: nginx-controller
      image: nginx
    tolerations:
    - key: "app"
      operator: "Equal"
      value: "blue"
      effect: "NoSchedule"
```

> NOTE: Tains and Tolerations doesn't guarantee a pod to go to a specific node