# Docker produccion o stage
FROM node:14.3.0

WORKDIR /app
RUN curl -L https://github.com/nmarsollier/semver_resource_server/tarball/master | tar xz --strip=1
RUN npm install --silent
RUN npm run build

# Puerto del servidor
EXPOSE 3000

ENV MONGO_URL mongodb://host.docker.internal/semver_server
ENV RABBIT_URL amqp://host.docker.internal

CMD cd dist; node server.js
