"use strict";

import Ajv from "ajv";
import * as error from "../utils/error";

const ajv = new Ajv();

export function validateSchema<T>(schema: object, data: T): T {
  const isValid = ajv.validate(schema, data);

  if (!isValid) {
    const errorMessages = ajv.errorsText();
    throw error.newArgumentError(
      `Bad request: ${errorMessages}`,
      "schema_validation"
    );
  }

  return data;
}
