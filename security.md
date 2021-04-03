# Security

## Essence

Who can access?

* Files - username and passwords
* Files - username and tokens
* Certificates
* External authentication providers - LDAP
* Service Accounts

What can they do?

* RBAC Authorization
* ABAC Authorizaiton
* Node Authorization
* Webhook Mode

TLS Certificates

* Kube API Server
* Kube Controller Manager
* Kube Scheduler
* ETCD Cluster
* kubelet
* kube proxy

Network Policy

## Docker security

add additional linux capability

```bash
docker run --cap-add MAC_ADMIN ubuntu
```

remove a linux capability

```bash
docker run --cap-drop KILL ubuntu
```

enable all

```bash
docker run --privileged ubuntu
```

docker run with non-root user

```bash
docker run --user=1000 ubuntu sleep 3600
```

Dockerfile

```dockerfile
FROM ubuntu

USER 1000
```

## Security Context

```yaml
apiVersion: v1
kind: Pod
metadata:
    name: web-pod
spec:
    securityContext:
        runAsuser: 1000
        capabilities:
            add: ["MAC_ADMIN"]
    container:
        - name: ubuntu
          image: ubuntu
          command: ["sleep", "3600"]
```

## Service Account

* User account: human
* Service account: machine

```bash
kubectl create serviceaccount dashboard-sa
kubectl get serviceaccount
kubectl describe secret dashboard-sa-token-kbbdm
```

auth to API server with token

```bash
curl https://192.168.56.70:6443/api -insecure --header "Authorization: Bearer ..."
```