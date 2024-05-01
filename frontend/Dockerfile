# Containerize React App to K8s w/ Docker
# Credit: https://mattermost.com/blog/how-to-deploy-a-react-app-to-kubernetes-using-docker/

FROM node:alpine

WORKDIR /app

EXPOSE 3000

# issue without **, see: https://stackoverflow.com/questions/65282627/how-to-solve-the-error-in-package-json-when-creating-an-image
COPY **/package.json ./
COPY **/package-lock.json ./

# install deps
RUN npm install
RUN npm install geolib
RUN npm install moment --save

COPY **/ ./

CMD ["npm", "start"]

