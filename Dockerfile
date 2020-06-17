# Docker produccion o stage
FROM node:14.3.0

WORKDIR /app
RUN curl -L https://github.com/nmarsollier/semver_resource_server/tarball/master | tar xz --strip=1
RUN npm install --silent
RUN npm run build

# Puerto del servidor
EXPOSE 3000

ENV MONGODB mongodb://host.docker.internal/resources_server

CMD cd dist; node server.js
