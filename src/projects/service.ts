"use strict";

import * as schema from "./schema";

export async function create(project: string): Promise<schema.Project> {
    try {
        const exists = await schema.find(project);
        if (exists) {
            return Promise.resolve(exists);
        }

        const newProject: schema.Project = new schema.ProjectModel();
        newProject.name = project;

        const t = await newProject.save();
        return Promise.resolve(t);
    } catch (err) {
        return Promise.reject(err);
    }
}

export async function fetchAll(): Promise<schema.Project[]> {
    try {
        const projects = await schema.findAll();
        if (!projects) {
            throw Promise.resolve([]);
        }
        return Promise.resolve(projects);
    } catch (err) {
        return Promise.reject(err);
    }
}
