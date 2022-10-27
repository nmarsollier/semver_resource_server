"use strict";

import * as get from "./get_projects";
import * as express from "express";

export function init(app: express.Express) {
  get.init(app);
}
