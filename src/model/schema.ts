"use strict";

import { Document, model, Schema } from "mongoose";

export interface Resource extends Document {
  project: string;
  language: string;
  semver: string;
  values: ResourceValue[];
  created?: Date;
  enabled?: boolean;
}

export interface ResourceValue {
  key: string;
  value: string;
}

const ResourceSchema = new Schema({
  project: {
    type: String,
    required: "Project is required"
  },
  language: {
    type: String,
    required: "Language is required"
  },
  semver: {
    type: String,
    required: "Version is required"
  },
  values: [{
    key: String,
    value: String
  }],
  created: {
    type: Date,
    default: Date.now()
  },
  enabled: {
    type: Boolean,
    default: true
  }
}, { collection: "resources" });

export async function findValid(project: string, language: string, semver: string): Promise<Resource> {
  return Promise.resolve(await ResourceModel.findOne({
    project,
    language,
    semver,
    enabled: true
  }));
}

export async function findVersions(project: string, language: string): Promise<string[]> {
  const versions = await ResourceModel.find(
    {
      project,
      language,
      enabled: true
    }, "semver"
  );

  return Promise.resolve(versions.map(value => {
    return value.semver;
  }));
}

export const ResourceModel = model<Resource>("resources", ResourceSchema);
