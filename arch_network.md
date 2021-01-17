# Architure and Network Basic

## Architecture

#### Master

* Scheduler: schedules a work (pods, services) to worker nodes
* Controller-manager: maintains desired state and corrective steps (Replication controller/replica set ensures the correct number of pod replicas are running at any given time)
* API server (apiserver): all the administrative tasks are performed via the API server (kubectl -> apiserver, apiserver -> etcd, apiserver -> worker node kubelet, kube-proxy)
* etcd: distributed configuration store (brain's shared memory), store cluster state and config details (subnet, configmaps, secrets etc), allow values to be watched for changes

#### Worker

* Pod
* Container runtime (docker, rkt)
* kubelet: interact with the API server to update the state and to start new workloads that have been invoked by the scheduler
* kube-proxy: provides basic load balancing and directs the traffic destined for specific services to the proper pod on the backend. proxy communication from a service endpoint back to the corresponding pod that is running the actual application
* cadvisor: analyze resource usage and performace data of running containers. it collects the metrics for all containers on a node and reports this back to the kubelet, which in trun reports to heapster

## Networking

* A flat address space or overlay networking
* Each pod has its own IP address (IP that a pod sees itself as is the same IP that other pods see it as)
* All pods can communicate with all other pods without NAT
* All nodes running pods can communicate with all pods (and vice-versa) without NAT
* Conatiners in the same pod share their pod's IP address and can communicate with each other through the localhost (IPC)
* The kubernetes service address range is configured using the --service-cluster-ip-range flag on the kube-apiserver binary. The service address range should not overlap with the IP subnets and ranges assigned to each docker bridge or kubernetes nodes

#### Pods

* A co-located set of containers, sharing compute, storage and network resources
* Core compute unit
* Its own IP address
* Inside a pod, containers share the network namespace
* Pods can communicate via the underlying physical infrastructure or software defined networking (overlay) like flannel, CNI
* A logical group of containers that we can replicate, schedule, and balance service endpoints across
* [pods.yaml](pods.yaml)

##### Intra-Pods (container to container) communication

* All the containers run on the same pod/node can talk to each other via local filesystem (IPC mechanism), or using localhost and well-known ports

##### Inter-Pods (pod to pod) communication

* Pods has its own IP address and can communicate directly without the aid of NAT, tunnels, proxies etc (flat networking)
* DNS can be used to work out of the box

##### Pod to Service communication

* While pods can be destroyed and created constantly, the service provides a layer of indirection for the service is stable even if the set of actual pods that respond to reqeusts is ever-chansing.
* Kube-proxy provides highly available load balancing because the kube-proxy on each node takes care of redirecting traffic to the correct pod automatically

#### Service

* East-West traffic stream
* An object in Kubernetes like Pods and RCs
* Abstraction which defines a logical set of pods based on **labels**
* Kubernetes implicitly manages endpoint of service through use of labels
* An abstraction of a logical set of pods defined and it acts as the intermediary for pods to talk to each other
* Exposes some functionality and is supported by a collection of workers called pods
* Load balancers which allows Pods to communicate each other without knowing where they are in the cluster using pod labels
* Given IP accessible within cluster
* The targetPort is mapped to the port exposed by matching pods
* When the number of pods scale up, they are automatically included in load balancing
* A virtual ip address and port are used as the entry points for the service, and the traffic is then forwarded to a random pod on a target port defined
* Updates to service definitions are monitored and coordinated from the k8s cluster master and propagated to the kube-proxy daemons running on each node
* Kubernetes is a dynamic system that challenges traditional methods of naming and connecting services over the network. The service object provides a flexible and powerful way to expose service both within the cluster and beyond
* Selector tells the kube-proxy which pods can answer the service that matches a specific label
* Persistent, service discovery, load balancing, stable service address, find pods by label selector
* [service.yaml](service.yaml)

##### Service Discovery

* Help find which processes are listening at which addresses for which services quickly and reliably
* Starts with a Service object
* Key to unblock the power of kubernetes
* Service discovery and internal load balancing for the pods within the cluster
* Once the app can dynamically find services and react to the dynamic placement of those apps, you're free to stop worrying about where things are running and when they move
* It's a logical way to think about services and let kubernetes take care of the details container placement
* label, kube-proxy, kube-dns
* Method 1: [kuard-pod.sh](kuard-pod.sh)
* Method 2: [kuard-pod.yaml](kuard-pod.yaml)

##### kube-proxy

* Run on every node
* Out-of-box service proxy solution
* Communication between the external world and pods are via kube-proxy
* Configure iptables for Cluster IP and Node ports to be available as service on the node for the pods
* It monitors the API from the kubernetes master and any updates to services will trigger an update
* L4 load balancing
* It can be replaced by L7 load balancer

##### kube-dns

* DNS for the kuberntes service discovery
* Serves all DNS requests
* Watches kubernetes API for new services and creates a set of DNS records for each service
* Access via service name (kuard) within the same name space or FQDN name (kuard.defult.svc.cluster.local)
* If DNS has been enabled throughout the cluster then all pods should be able to do name resolution of service automatically

#### Service Load Balancing Types

##### ClusterIP (Internal LB)

* Type: ClusterIP
* Expose the service on a cluster-internal IP
* Cluster internal IP is allocated from the cluster CIDR for the service and acts as VIP on each node that can be reached by the pods
* Internal inter-pods communication without external service entry
* Service is reachable only within the cluster - not allowed from external
* [clusterip.yaml](clusterip.yaml)

##### NodePort (Custom LB)

* Type: NodePort
* Exposes the service on each Node's IP at a static port and allows outside to be able to contact the cluster
* Can also use an external load balancer to point to this for inbound service traffic from outside world
* Allow to expose a service through the host or node on a specific port
* Service is reachable through <NodeIP>:NodePort address (any node ip works to reach any available node/service)
* Default port range (30000-32767)
* [nodeport.yaml](nodeport.yaml)

##### LoadBalcner (External LB) - Cloud Integration

* Type: LoadBalancer
* Google's native way for the google cloud service
* Creates an external load balancer on the cloud provider
* Integration is smooth. Only need to open firewall rules for the external service ports
* [loadbalancer.yaml](loadbalancer.yaml)