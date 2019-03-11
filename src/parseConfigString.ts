import { configFromObject } from "./configFromObject";
import { Configuration, Schema } from "./types";
import { getError, ErrorType, ErrorLevel } from "./getError";

export const parseConfigString = (
  input: string,
  source?: string,
): Configuration => {
  try {
    const config: Schema | undefined = JSON.parse(input);

    if (!config) {
      throw new Error(`Parsing configuration returned non-object ${ config }`);
    }

    return configFromObject(config, source);
  } catch (error) {
    return getError(null, ErrorType.CONFIG_PARSE_ERROR, ErrorLevel.ERROR, {
      error,
      source,
    });
  }
};
