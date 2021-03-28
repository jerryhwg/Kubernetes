# ReplicaSets

Replication controller replaced by ReplilcaSets

main difference is `selector:` field in replicaset

replicaset example `replicaset-definition.yml`

```yaml
apiVersion: apps/v1
kind: ReplicaSet
metadata:
    name: myapp-replicaset
    labels:
        app: myapp
        type: front-end
spec:
    template:
        metadata:
            name: myapp-pod
            labels:
                app: myapp
                type: front-end
            spec:
                containers:
                - name: nginx-container
                  image: nginx
    replicas: 3
    selector:
        matchLabels:
            type: front-end
```

`NOTE` matchLabel label matches the one under pod definition labels

the labels are used as filter to monitor pods

create

```bash
kubectl create -f replicaset-definition.yml
```

view

```bash
kubectl get replicaset
```

Scale out

update `replicas` parameter and run

```bash
kubectl replace -f replicaset-definition.yml
```