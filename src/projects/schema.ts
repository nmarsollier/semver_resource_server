"use strict";

import { Document, model, Schema } from "mongoose";

export interface Project extends Document {
  name: string;
}

const ProjectSchema = new Schema({
  name: {
    type: String,
    required: "Project is required"
  },
  created: {
    type: Date,
    default: Date.now()
  },
  enabled: {
    type: Boolean,
    default: true
  }
}, { collection: "projects" });

export async function findAll(): Promise<Project[]> {
  return Promise.resolve(await ProjectModel.find({
    enabled: true
  }));
}

export async function find(project: string): Promise<Project> {
  return Promise.resolve(await ProjectModel.findOne({
    name: project,
    enabled: true
  }));
}

export const ProjectModel = model<Project>("projects", ProjectSchema);
