"use strict";

import * as express from "express";
import * as error from "../utils/error";
import * as resourceService from "./service";

export function init(app: express.Express) {
    app.route("/resources/:project/versions")
        .get(retrieveVersions);
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
async function retrieveVersions(req: express.Request, res: express.Response) {
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
