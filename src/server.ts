"use strict";

import * as database from "./server/database";
import * as env from "./utils/environment";
import { Config } from "./utils/environment";
import * as express from "./server/express";

// Inicializamos la base de datos
database.init();

// Se configura e inicia express
const app = express.init();

// Variables de entorno
const conf: Config = env.getConfig(process.env);

app.listen(conf.port, () => {
    console.log(`Semver resource server  escuchando en puerto ${conf.port}`);
});

module.exports = app;
