// Turn an object containing a partial configuration into a full warhol config
// with sensible defaults

import * as Ajv from "ajv";
import * as betterAjvErrors from "better-ajv-errors";
import { Parameter } from "@warhol/utilities";
import * as schema from "./schema/warhol.schema.json";
import { InvalidConfigError } from "./errors";
import { withDefaults } from "./defaults";
import { Configuration } from "./types";
import { checkSanity } from "./sanity";

const validator = new Ajv({ jsonPointers: true }).compile(schema as any);

// The input parameters corrospond to the minimal possible configuration and is
// defined by the arguments of the function that can turn it partial configs
// into full configs.
export const fromObject = (
  input: Parameter<typeof withDefaults, 0>,
): Configuration => {
  const isValid = validator(input);
  if (!isValid) {
    const error = betterAjvErrors(schema, input, validator.errors, {
      format: "js",
    });
    throw new InvalidConfigError(JSON.stringify(error));
  }
  checkSanity(input);
  return withDefaults(input);
};
