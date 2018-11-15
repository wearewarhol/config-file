import * as Ajv from "ajv";
import * as schema from "./schema/warhol.schema.json";
import { Configuration, Schema, Component } from "./types";
import { getError, ErrorType, ErrorLevel } from "./getError";

const validator = new Ajv().compile(schema as any);

type SelectorTuple = (conf: Component) => [HTMLElement | string, string];
const getSelectorTuple: SelectorTuple = (conf) =>
  [conf.source, conf.target];

const getComponentConfiguration = (
  {
    styleguideUrl,
    components: inputComponents,
    breakpoints,
  }: Schema,
): Configuration => {
  const components = inputComponents.map(getSelectorTuple);

  return {
    styleguideUrl,
    breakpoints: breakpoints || [ 1000 ],
    components,
    issues: [],
  };
};

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
