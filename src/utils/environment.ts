"use strict";

import * as dotenv from "dotenv";
let config: Config;

export function getConfig(environment: any): Config {
  if (!config) {
    dotenv.config({ path: ".env" });

    config = {
      port: process.env.SERVER_PORT || "3000",
      mongoDb: process.env.MONGODB || "mongodb://localhost/resources_server"
    };
  }
  return config;
}

export interface Config {
  port: string;
  mongoDb: string;
}
