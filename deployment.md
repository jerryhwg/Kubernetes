# Deployment

Say for example you have a web server that needs to be deployed in a production environment. 

* You need not one but many such instances of the web server running for obvious reasons.

* Secondly whenever newer versions of application builds become available on the docker registry you would like to upgrade your Docker instances seamlessly.

* However when you upgrade your instances you do not want to upgrade all of them at once as we just did. This may impact users accessing our applications, so you might want to upgrade them one after the other. And that kind of upgrade is known as rolling updates.

* Suppose one of the upgrades you performed resulted in an unexpected error and you're asked to undo the recent change you would like to be able to roll back the changes that were recently carried out. 
  
* Finally, say for example you would like to make multiple changes to your environment such as upgrading the underlying WebServer versions, as well as scaling your environment and also modifying the resource allocations etc.
WebServer versions, as well as scaling your environment and also modifying the resource allocations etc.

* You do not want to apply each change immediately after the command is run instead you would like to apply a pause to your environment, make the changes and then resume so that all changes are rolled-out together. 

* Using a deployment, you don’t have to deal with pods manually. You can just declare the desired state of the system, and it will be managed for you automatically. If a pod dies, the deployment will automatically re-create it.

All of these capabilities are available with the kubernetes Deployments. So far in this course.

{ Deployment { Replica Set { Pod }}}

```bash
kubectl create -f deployment-definition.yml
kubectl get deployments
kubectl get replicaset
kubectl get pods
kubectl get all
```

Definition file

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
    name: myapp-deployment
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
            - name: nginx-controller
              image: nginx
replicas: 3
selector:
    matchLabels:
        type: front-end
```