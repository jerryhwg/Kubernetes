# Pods

Dockerfile

```Dockerfile
FROM Ubuntu
ENTRYPOINT ["sleep"]
CMD ["5"]
```

expand command and args

pod-definition.yaml

```yaml
apiVersion: v1
kind: Pod
metadata:
    name: ubuntu-sleeper-pod
spec:
    containers:
        - name: ubuntu-sleeper
          image: ubuntu-sleeper
          command: ["sleep2.0"]
          args: ["10"]
```

## Note on editing Pods and Deployments

You cannot edit specifications of an existing Pod other than the below:

* spec.containers[*].image
* spec.initContainers[*].image
* spec.activeDeadlineSeconds
* spec.tolerations

how to edit

```bash
kubectl get pod webapp -o yaml > my-new-pod.yaml
vi my-new-pod.yaml
kubectl delete pod webapp
kubectl create -f my-new-pod.yaml
```

However, you can easily edit any field/property of the Pod template with **Deployments**

```bash
kubectl edit deployment my-deployment
```