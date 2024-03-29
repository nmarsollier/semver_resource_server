"use strict";

import * as bodyParser from "body-parser";
import compression from "compression";
import cors from "cors";
import express from "express";
import * as helmet from "helmet";
import * as env from "../utils/environment";
import * as error from "../utils/error";
import * as resourceRoutes from "../resources/routes";
import * as projectRoutes from "../projects/routes";
import * as path from "path";
require("express-async-errors");


export function init(): express.Express {
  const appConfig: env.Config = env.getConfig(process.env);

  const app = express();
  app.set("port", appConfig.port);

  // Habilitar Cors
  app.use(cors({
    origin: true,
    optionsSuccessStatus: 200,
    credentials: true
  }));

  // Configuramos el server para que tome los json correctamente
  app.use(bodyParser.urlencoded({ extended: true, limit: "20mb" }));
  app.use(bodyParser.json({ limit: "5mb" }));

  // Configurar express para comprimir contenidos de text en http
  app.use(compression());

  // helmet le da seguridad al sistema para prevenir hacks
  app.use(helmet.xssFilter());  // Previene inyección de javascript
  app.use(helmet.noSniff());
  app.use(helmet.ieNoOpen());
  app.disable("x-powered-by");

  // Esta es la ruta de contenidos estáticos, no deberían haber muchos pero algo de documentación
  // vendría bien como contenido estático.
  app.use(
    express.static(path.join(__dirname, "../public"), { maxAge: 31557600000 })
  );
  app.get("/", (req, res, next) => {
    res.redirect("index.html");
  });


  // Iniciamos las rutas
  resourceRoutes.init(app);
  projectRoutes.init(app);

  // Para el manejo de errores, para que los loguee en la consola
  app.use(error.handle);

  // Responder con JSON cuando hay un error 404, sino responde con un html
  // Esto tiene que ir al final porque sino nos sobreescribe las otras rutas
  app.use(error.handle404);

  return app;
}
