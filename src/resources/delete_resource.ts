"use strict";

import * as express from "express";
import * as error from "../utils/error";
import * as resourceService from "./service";

export function init(app: express.Express) {
    app.route("/resources/:project/:language/:semver")
        .delete(invalidateResource);
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
