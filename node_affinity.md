# Node Affinity

## Node Selectors

pod-definition.yml

```yml
apiVersion
kind: Pod
metadata:
    name: myapp-pod
spec:
    containers:
    - name: data-processor
      image: data-processor
    nodeSelector:
        size: Large
```

Label Nodes

```bash
kubectl label nodes node-1 size=Large
```

Node Selector - Limitations

* Large or Medium
* NOT Small

## Node Affinity

pod-definition.yml

```yml
apiVersion
kind: Pod
metadata:
    name: myapp-pod
spec:
    containers:
    - name: data-processor
      image: data-processor
    affinity:
        nodeAffinity:
            requiredDuringSechedulingIgnoreDuringExecution:
                nodeSelectorTerms:
                - matchExpressions:
                  - key: size
                    operator: In
                    values:
                    - Large
                    - Medium
```

Node Affinity Types

* requiredDuringSchedulingIgnoredDuringExecution
* preferredDuringSchedulingIgnoredDuringExecution

(Planned)

* requiredDuringSchedulingRequiredDuringExecution