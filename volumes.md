# Volumes

## Volumes

```yaml
apiVersion: v1
kind: Pod
metadata:
spec:
    containers:
    - image: alpine
      name: alpine
      volumeMounts:
      - name: data-volume

    volumes:
    - name: data-volume
      hostPath:
        path: /data
        type: Directory
```

ebs case

```yaml
volumes:
- name: data-volume
  awsElasticBlockStore:
    volumeID: <volume-id>
    fsType: ext4
```

secret

```yaml
volumes:
- name: app-secret
  secret:
    defaultMode: 400
    secretName: {{ .name }}
```

## Persistent Volumes

Pool of storage for PVC

Use PVC (Persistent Volume Claim) to carve out a portion of the storage pool in Pod

pv-definition.yaml

```yaml
apiVersion: v1
kind: PersistentVolume
metadata:
    name: pv-vol1
spec:
    accessModes:
        - ReadWriteOnce
    capacity:
        storage: 1Gi
    awsElasticBlockStore:
        volumeID: <volume-id>
        fsType: ext4
```

pvc-definition.yaml

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
    name: myclaim
spec:
    accessModes:
        - ReadWriteOnce
    resources:
        requests:
            storage: 500Mi
```