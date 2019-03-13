import * as Ajv from "ajv";
import * as betterAjvErrors from "better-ajv-errors";
import * as schema from "./schema/warhol.schema.json";
import { withDefaults } from "./defaults";
import { Configuration } from "./types";

const validator = new Ajv({ jsonPointers: true }).compile(schema as any);

export const fromObject = (input: any): Configuration => {
  const isValid = validator(input);
  if (!isValid) {
    const error = betterAjvErrors(schema, input, validator.errors, {
      format: "js",
    });
    throw new Error(JSON.stringify(error));
  }
  return withDefaults(input);
};
