"use strict";

import * as express from "express";
import * as error from "../utils/error";
import * as resourceService from "./service";

export function init(app: express.Express) {
    app.post("/resources/:project/:language/:semver", createResource);
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
