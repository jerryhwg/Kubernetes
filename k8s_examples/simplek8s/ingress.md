# Ingress

What are required

deployment

```yaml
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
    name: nginx-ingress-controller
spec:
    replicas: 1
    selector:
        matchLabels:
            name: nginx-ingress
    template:
        metadata:
            label:
                name: nginx-ingress
        spec:
            containers:
                - name: nginx-ingress-controller
                  image: quay.io/kubernetes-ingress-controller/nginx-ingress-controller:0.21.0
            args:
                - /ngix-ingress-controller
                - --configmap=$(POD_NAMESPACE)/nginx-configuration
            env:
                - name: POD_NAME
                  valueFrom:
                    fieldRef:
                        fieldPath: metadata.name
                - name: POD_NAMESPACE
                  valueFrom:
                    fieldRef:
                        fieldPath: metadata.namespace
            ports:
                - name: http
                  containerPort: 80
                - name: https
                  containerPort: 443
```

configmap

```yaml
kind: ConfigMap
apiVersion: v1
metadata:
    name: nginx-configuration
```

service

```yaml
apiVersion: v1
kind: Service
metadata:
    name: nginx-ingress
spec:
    type: NodePort
    ports:
    - port: 80
      targetPort: 80
      protocol: TCP
      name; http
    - port: 443
      targetPort: 443
      protocol: TCP
      name: https
    selector:
        name: nginx-ingress
```

permission (auth)

```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
    name: nginx-ingress-serviceaccount
```

ingress resource

`ingress-wear.yaml`

my-online-store.com/wear / my-online-store.com/watch

```yaml
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
    name: ingress-wear-watch
spec:
    rules:
    - http:
        paths:
        - path: /wear
          backend:
            serviceName: wear-service
            servicePort: 80
        - path: /watch
          backedn:
            serviceName: watch-service
            servicePort: 80
```

wear.my-online-store.com / watch.my-online-store.com

```yaml
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
    name: ingress-wear-watch
spec:
    rules:
    - host: wear.my-online-store.com
      http:
        paths:
        - path: /wear
          backend:
            serviceName: wear-service
            servicePort: 80
    - host: watch.my-online-store.com 
      http:
        path: /watch
        backedn:
            serviceName: watch-service
            servicePort: 80
```

```bash
kubectl get ingress
kubectl describe ingress ingress-wear-watch
```