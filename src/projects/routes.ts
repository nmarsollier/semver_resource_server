"use strict";

import * as express from "express";
import * as error from "../utils/error";
import * as service from "./service";

export function init(app: express.Express) {
  app.route("/projects").get(retrieveProjects);
}

/**
 * @api {get} /projects Retrive list of projects
 * @apiName Fetch Project Names
 * @apiGroup Project
 *
 * @apiDescription Fetch project names.
 *
 * @apiSuccessExample {json} Project
 *     HTTP/1.1 200 OK
 *
 * @apiUse ParamValidationErrors
 * @apiUse OtherErrors
 */
async function retrieveProjects(req: express.Request, res: express.Response) {
  try {
    const data = await service.fetchAll();

    return res.json(data.map(value => {
        return {
          name: value.name
        };
      }));
  } catch (err) {
    error.handle(res, err);
  }
}
