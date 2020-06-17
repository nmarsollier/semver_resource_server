"use strict";

import * as error from "../utils/error";
import * as schema from "./schema";
import * as semver from "semver";
// @ts-ignore
import * as bcp47 from "bcp47-validate";

export async function create(project: string, language: string, version: string, values: schema.ResourceValue[]): Promise<string> {
    try {
        const validSemver = validateSemver(version);
        validateProjectName(project);
        validateLanguaje(language);
        await validateDocumentExist(project, language, version);

        const resource: schema.Resource = new schema.ResourceModel();
        resource.project = project;
        resource.language = language;
        resource.semver = validSemver;
        resource.values = values;

        const t = await resource.save();
        return Promise.resolve(t.semver);
    } catch (err) {
        return Promise.reject(err);
    }
}

export async function invalidate(project: string, language: string, version: string): Promise<string> {
    try {
        const resource = await schema.findValid(project, language, version);
        if(!resource) {
            throw error.newError(404, "Document not found");
        }
        resource.enabled = false;
        const t = await resource.save();
        return Promise.resolve(t.semver);
    } catch (err) {
        return Promise.reject(err);
    }
}

export async function fetch(project: string, language: string, version: string): Promise<schema.Resource> {
    try {
        const versions = await schema.findVersions(project, language);
        const maxVer = semver.maxSatisfying(versions, version);

        const resource = await schema.findValid(project, language, maxVer);
        if(!resource) {
            throw error.newError(404, "Document not found");
        }
        return Promise.resolve(resource);
    } catch (err) {
        return Promise.reject(err);
    }
}

async function validateDocumentExist(project: string, language: string, semver: string): Promise<void> {
    const exist = await schema.findValid(project, language, semver);
    if (exist) {
        return Promise.reject(error.newError(error.ERROR_NOT_FOUND, "Semver already exist."));
    }
    return Promise.resolve();
}

function validateSemver(version: string): string {
    const validSemver = semver.valid(version);
    if (!validSemver) {
        throw error.newArgumentError("semver", "Semver invalid.");
    }
    return validSemver;
}

function validateProjectName(project: string) {
    const pattern = /^\S+$/;
    if (!pattern.test(project)) {
        throw error.newArgumentError("project", "Project " + project + " invalid.");
    }
}

function validateLanguaje(language: string) {
    if(!bcp47.validate(language)) {
        throw error.newArgumentError("language", "Language " + language + " is invalid.");
    }
}
