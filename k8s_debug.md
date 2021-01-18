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

```yml
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

Check node status
```
kubectl get nodes
```
Check pod status if control plane service is deployed in pod
```
kubectl get pods -n kube-system
kubectl logs kube-apiserver-master -n kube-system
```
Check service status if control plane service is deployed as service on a node
```
service kube-apiserver status 
service kube-controller-manager status
service kube-scheduler status
service kubelet status
service kube-proxy status
```
Check log
```
sudo journalctl -u kube-apiserver
```

## Worker Node Issue

Check the node status ready or not ready
```
kubectl get nodes
```
If not ready
```
kubectl describe node worker1
```
troubleshooting kubelet status, node os level
> Out of Disk, MemoryPressure,DiskPressuer,PIDPressure flag True or False

> Unknown: lost communication from control plane, possible loss of a node
* Check lastHeartbeatTime

Check node using linux troubleshooting

Check kubelet status
```
ps -ef |grep -i kubelet
systemctl status kubelet.service -l
systemctl restart kubelet.service
```

Check kubelet log
```
sudo journalctl -u kubelet
/var/log/kubelet.log
/var/log/kube-proxy.log
```
Check certificate (expired? right ca? path etc)
```
openssl x509 -in /var/lib/kubelet/worker1.crt -text
```

## Network Issue

Check servicee port info
```
kubectl cluster-info
```

## Links

https://kubernetes.io/docs/tasks/debug-application-cluster/debug-cluster