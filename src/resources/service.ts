"use strict";

import * as semver from "semver";
import * as error from "../utils/error";
import * as schema from "./schema";
// @ts-ignore
import * as bcp47 from "bcp47-validate";
import postResourceSchema from "../../schema/resource-value-schema.json";
import * as projectService from "../projects/service";
import { validateSchema } from "../utils/validate-schema";


export async function create(project: string, language: string, version: string, values: string): Promise<string> {
    try {
        validateDocument(values);
        const validSemver = validateSemver(version);
        validateProjectName(project);
        validateLanguaje(language);
        await validateDocumentExist(project, language, version);


        const resource: schema.Resource = new schema.ResourceModel();
        resource.project = project;
        resource.language = language;
        resource.semver = validSemver;
        resource.values = (values as unknown) as schema.ResourceValue[];

        const t = await resource.save();

        projectService.create(resource.project);

        return Promise.resolve(t.semver);
    } catch (err) {
        return Promise.reject(err);
    }
}

export async function invalidate(project: string, language: string, version: string): Promise<string> {
    try {
        const resource = await schema.findValid(project, language, version);
        if (!resource) {
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
        const maxVer = semver.maxSatisfying(versions, version) as string;

        const resource = await schema.findValid(project, language, maxVer);
        if (!resource) {
            throw error.newError(404, "Document not found");
        }
        return Promise.resolve(resource);
    } catch (err) {
        return Promise.reject(err);
    }
}


export async function fetchLanguages(project: string): Promise<schema.Language[]> {
    try {
        const versions = await schema.findLanguages(project);
        return Promise.resolve(versions);
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
    if (!bcp47.validate(language)) {
        throw error.newArgumentError("language", "Language " + language + " is invalid.");
    }
}


/**
 * Validate body to create resources
 */
function validateDocument(body: string) {
    if (!Array.isArray(body)) {
        throw error.newArgumentError("body", "Document must be an array.");
    }

    const data: schema.ResourceValue[] = body;

    data.forEach(project => {
        validateSchema<schema.ResourceValue>(postResourceSchema, project);
    });
}
