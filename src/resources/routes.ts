"use strict";

import * as express from "express";
import * as error from "../utils/error";
import * as resourceService from "./service";

export function init(app: express.Express) {
  app.route("/resources/:project/:language/:semver")
    .post(createResource)
    .delete(invalidateResource)
    .get(retrieveResource);

  app.route("/resources/:project/versions")
    .get(retrieveLanguages);
}


/**
 * @api {post} /resources/:project/:language/:semver Add Document Version
 * @apiName Add Document
 * @apiGroup Documents
 *
 * @apiDescription Adds ad version to the document.
 *
 * @apiExample {json} Body
 *   [
 *    {
 *      "key" : "example_text",
 *      "value" : "Hello World",
 *    },
 *    ...
 *   ]
 *
 * @apiSuccessExample { "sermver": "version"} Version added
 *     HTTP/1.1 200 OK
 *
 * @apiUse ParamValidationErrors
 * @apiUse OtherErrors
 */
async function createResource(req: express.Request, res: express.Response) {
  try {
    const project = req.params.project;
    const language = req.params.language;
    const semver = req.params.semver;

    const version = await resourceService.create(project, language, semver, req.body);

    return res.json({
      semver: version
    });
  } catch (err) {
    error.handle(res, err);
  }
}


/**
 * @api {delete} /resources/:project/:language/:semver Delete the semver version
 * @apiName Remove Document
 * @apiGroup Documents
 *
 * @apiDescription Remove ad version to the document.
 *
 * @apiSuccessExample { "sermver": "version"} Version removed
 *     HTTP/1.1 200 OK
 *
 * @apiUse ParamValidationErrors
 * @apiUse OtherErrors
 */
async function invalidateResource(req: express.Request, res: express.Response) {
  try {
    const project = req.params.project;
    const language = req.params.language;
    const semver = req.params.semver;

    const version = await resourceService.invalidate(project, language, semver);

    return res.json({
      semver: version
    });
  } catch (err) {
    error.handle(res, err);
  }
}


/**
 * @api {get} /resources/:project/:language/:semver Retrive document
 * @apiName Fetch Document
 * @apiGroup Documents
 *
 * @apiDescription Fetch document.
 *
 * @apiSuccessExample {json} Document
 *     HTTP/1.1 200 OK
 *
 * @apiUse ParamValidationErrors
 * @apiUse OtherErrors
 */
async function retrieveResource(req: express.Request, res: express.Response) {
  try {
    const project = req.params.project;
    const language = req.params.language;
    const semver = req.params.semver;

    const data = await resourceService.fetch(project, language, semver);

    return res.json({
      project: data.project,
      language: data.language,
      semver: data.semver,
      values: data.values.map(value => {
        return {
          key: value.key,
          value: value.value
        };
      })
    });
  } catch (err) {
    error.handle(res, err);
  }
}

/**
 * @api {get} /resources/:project/versions Retrive document versions
 * @apiName Fetch Document Language and Versions
 * @apiGroup Documents
 *
 * @apiDescription Fetch document versions.
 *
 * @apiSuccessExample {json} Document Versions
 *     HTTP/1.1 200 OK
 *
 * @apiUse ParamValidationErrors
 * @apiUse OtherErrors
 */
async function retrieveLanguages(req: express.Request, res: express.Response) {
  try {
    const project = req.params.project;

    const data = await resourceService.fetchLanguages(project);

    return res.json(data.map(d => {
      return {
        language: d.language,
        versions: d.versions
      };
    }));
  } catch (err) {
    error.handle(res, err);
  }
}
