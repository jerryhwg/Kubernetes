# Kubernetes Troubleshooting

## Application Issue

Check web service (front-end) accessible using curl

```
curl https://ip:node-port
```

Check endpoints discovered

```
kubectl describe service web-service
```
> OUTPUT:
Endpoints: 10.1.0.100:8080

Check targetPort, nodePort

Compare the selector in between service and pod deployment

```
kubectl describe service web-service
```
> Selector: name=webapp-mysql

vs.

```
apiVersion: v1
kind: Pod
metadata:
	name: webapp-mysql
	labels:
		app: example-app
		name: webapp-mysql
```

Check pod status
```
kubectl get pod
```
* status: running ?
* number of restarts

Check events
```
kubectl describe pod web
```

Check logs
```
kubectl logs web -f 
kubectl logs web --previous
```

Check db service (back-end) accessible

Check db pod

Other useful commands
```
kubectl describe deployment. webapp-mysql
kubectl -n qa get deployments. webapp-mysql -o yaml > web.yaml
kubectl delete deployments. webapp-mysql -n qa
kubectl create -f web.yaml
kubectl -n qa get ep
kubectl -n qa expose pod mysql --name=mysql-service
```

## Control Plane Issue





## Worker Node Issue


## Network Issue