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

Once running backend documentation is exposed on [localhost:3000](http://localhost:3000/)

[API Docs](./README-API.md)

## Dependencies

### Node 12+

[nodejs.org](https://nodejs.org/en/)

## Environment vars

Everything is configured using environment args, see utils/environment.ts

## Apidoc

[Apidoc](http://apidocjs.com/)

