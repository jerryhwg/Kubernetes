kubectl run kuard --image=gcr.io/kuar-demo/kuard-amd64:1 --port=8080 --labels="ver=1,app=kuard,env=prod"
kubectl expose deployment kuard
kubectl get services -o wide
 
NAME CLUSTER-IP ... PORT( S) ... SELECTOR 
kuard 10.115.245.13 ... 8080/TCP ... app=kuard, env=prod, ver=1
 
KUARD_POD=$(kubectl get pods -l app=kuard -o jsonpath='{.items[0[.metadata.name}')
kubectl port-forward $KUARD_POD 48858:8080