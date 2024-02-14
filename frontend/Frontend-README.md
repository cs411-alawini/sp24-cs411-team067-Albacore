# Deployment to Local K8s (k3s distro) cluster

## 1. Install Kubectl, the Kubernetes CLI
- Download it [here](https://kubernetes.io/docs/tasks/tools/)
- Ensure the version is v1.29.0

## 2. Download Rancher Desktop
- Download it [here](https://rancherdesktop.io/)
- Make sure sudo access is enabled
- Choose container engine as `dockerd`
- When running Rancher Desktop, make sure Docker is off
- If you get this error `connection to the server 127.0.0.1:6443 was refused`, restart Rancher Desktop

## 3. Setup local registry
- Make sure Rancher Desktop is running

See link [attached](https://stackoverflow.com/questions/57167104/$$how-to-use-local-docker-image-in-kubernetes-via-kubectl) for more

Run this command:

`docker run -d -p 5000:5000 --restart=always --name registry registry:2`

## 4. Build Image
`docker build . -t  campus-cache-react`

## 5. Push Image to local registry
`docker push campus-cache-react`

## 6. Deploy to Cluster
`kubectl apply -f deployment.yaml`

## Kubectl Run
kubectl run campus-cache --image=campus-cache-react:latest --image-pull-policy=Never --port=3000

## Kubectl Port Forward
kubectl port-forward pods/campus-cache-react 3000:30
00

## sh into pod
kubectl exec --stdin --tty campus-cache-react -- /bin/bash

## Delete Deployment
`kubectl delete -n default deployment campus-cache-depl
oyment`

## Run image locally and open
`docker run -it -p 3000:3000 campus-cache-react`

`open http://localhost:3000`


