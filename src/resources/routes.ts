"use strict";

import * as express from "express";
import * as del from "./delete_resource";
import * as get from "./get_resource";
import * as getVersions from "./get_versions";
import * as post from "./post_resource";

export function init(app: express.Express) {
  del.init(app);
  get.init(app);
  getVersions.init(app);
  post.init(app);
}
