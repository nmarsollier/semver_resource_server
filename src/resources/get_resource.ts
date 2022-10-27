"use strict";

import * as express from "express";
import * as error from "../utils/error";
import * as resourceService from "./service";

export function init(app: express.Express) {
    app.route("/resources/:project/:language/:semver")
        .get(retrieveResource);
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
