import * as Ajv from "ajv";
import * as schema from "./schema/warhol.schema.json";
import { Configuration, Schema, Component } from "./types";
import { getError, ErrorType, ErrorLevel } from "./getError";

const validator = new Ajv().compile(schema as any);

const getComponentConfiguration = (
  {
    styleguideUrl,
    components: inputComponents,
    colorSources,
    breakpoints,
  }: Schema,
): Configuration => ({
  styleguideUrl,
  breakpoints: breakpoints || [ 1000 ],
  components: inputComponents,
  colorSources,
  issues: [],
});

export const parseConfigString = (
  input: string,
  source?: string,
): Configuration => {
  try {
    const config: Schema | undefined = JSON.parse(input);

    if (!config) {
      throw new Error(`Parsing configuration returned non-object ${ config }`);
    }

    const isValid = validator(config);

    if (!isValid) {
      return getError(config.styleguideUrl, ErrorType.CONFIG_VALIDATION_ERROR, ErrorLevel.ERROR, {
        error: validator.errors,
      });
    }

    return getComponentConfiguration(config);
  } catch (error) {
    return getError(null, ErrorType.CONFIG_PARSE_ERROR, ErrorLevel.ERROR, {
      error,
      source,
    });
  }
};
