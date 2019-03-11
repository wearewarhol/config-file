import * as Ajv from "ajv";
import * as schema from "./schema/warhol.schema.json";
import { Configuration, Schema } from "./types";
import { getError, ErrorType, ErrorLevel } from "./getError";

const validator = new Ajv().compile(schema as any);

const getComponentConfiguration = (
  {
    styleguideUrl,
    components: inputComponents,
    colorSources,
    colorSourceProperties,
    breakpoints,
  }: Schema,
): Configuration => ({
  styleguideUrl,
  breakpoints: breakpoints || [ 1000 ],
  components: inputComponents,
  colorSources: colorSources || [],
  colorSourceProperties: colorSourceProperties || [],
  issues: [],
});

export const configFromObject = (
  input: Schema | undefined,
  source?: string,
): Configuration => {
  try {
    if (!input) {
      throw new Error(`Can't parse non-object ${ input }`);
    }

    const isValid = validator(input);

    if (!isValid) {
      return getError(input.styleguideUrl, ErrorType.CONFIG_VALIDATION_ERROR, ErrorLevel.ERROR, {
        error: validator.errors,
      });
    }

    return getComponentConfiguration(input);
  } catch (error) {
    return getError(null, ErrorType.CONFIG_PARSE_ERROR, ErrorLevel.ERROR, {
      error,
      source,
    });
  }
};
