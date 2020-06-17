# SemVer Resource Server

A microservice for i18n json resources, providing a [semver](https://devhints.io/semver) strategy to 
store and retrieve them.

The idea is to store project json resource files by language, and provide a version for them,
so clients could retrieve documents for the desired project and language plus using semver semantic
to provide version compatibility (useful on mobile where app version is hard to ensure).

We need a mongoose database :

## MongoDB

```bash
docker run -d --name ec-mongo -p 27017:27017 mongo:4.0.18-xenial
```

## Run

```bash
npm install
npm start
```

## Docker Run

```bash
docker build --no-cache -t semver_resource_server https://raw.githubusercontent.com/nmarsollier/semver_resource_server/master/Dockerfile

# Mac || Windows
docker run -it -d --name semver_resource_server -p 3000:3000 semver_resource_server

# Linux
docker run --add-host host.docker.internal:172.17.0.1 -it -d --name semver_resource_server -p 3000:3000 semver_resource_server
```

Once running backend documentation is exposed on [localhost:3000](http://localhost:3000/)

[API Docs](./README-API.md)

## Dependencies

### Node 12+

[nodejs.org](https://nodejs.org/en/)

## Environment vars

Everything is configured using environment args, see utils/environment.ts

## Adding some data

```bash
curl --location --request POST 'http://localhost:3000/resources/hola_mundo/es/1.0.0' \
--header 'Content-Type: application/json' \
--data-raw '[
   {
      "key":"text_1",
      "value":"Hola"
   },
   {
      "key":"text_2",
      "value":"Mundo 1.0.0"
   }
]'

curl --location --request POST 'http://localhost:3000/resources/hola_mundo/es/1.0.1' \
--header 'Content-Type: application/json' \
--data-raw '[
   {
      "key":"text_1",
      "value":"Hola"
   },
   {
      "key":"text_2",
      "value":"Mundo 1.0.1"
   }
]'

curl --location --request POST 'http://localhost:3000/resources/hola_mundo/es/1.0.2' \
--header 'Content-Type: application/json' \
--data-raw '[
   {
      "key":"text_1",
      "value":"Hola"
   },
   {
      "key":"text_2",
      "value":"Mundo 1.0.2"
   }
]'

curl --location --request POST 'http://localhost:3000/resources/hola_mundo/es/1.2.0' \
--header 'Content-Type: application/json' \
--data-raw '[
   {
      "key":"text_1",
      "value":"Hola"
   },
   {
      "key":"text_2",
      "value":"Mundo 1.2.0"
   }
]'

curl --location --request POST 'http://localhost:3000/resources/hola_mundo/es/2.0.0' \
--header 'Content-Type: application/json' \
--data-raw '[
   {
      "key":"text_1",
      "value":"Hola"
   },
   {
      "key":"text_2",
      "value":"Mundo 2.0.0"
   }
]'
```


## Get document

We can use any semver wildcard  [semver](https://devhints.io/semver) to retrieve documents.
Examples :

### Specific version

```bash
curl --location --request GET 'http://localhost:3000/resources/hola_mundo/es/1.0.0'
```

### Get most recent fix

```bash
curl --location --request GET 'http://localhost:3000/resources/hola_mundo/es/1.0.*'
```

### Get major recent version

```bash
curl --location --request GET 'http://localhost:3000/resources/hola_mundo/es/1.*'
```

### Get latest version

```bash
curl --location --request GET 'http://localhost:3000/resources/hola_mundo/es/*'
```

## List project names

```bash
curl --location --request GET 'http://localhost:3000/projects'
```

## Get language and versions by project

```bash
curl --location --request GET 'http://localhost:3000/resources/hola_mundo/versions'
```
