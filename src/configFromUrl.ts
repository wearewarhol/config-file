import * as request from "request-promise-native";

import { Configuration } from "./types";
import { parseConfigString } from "./parseConfigString";
import { getError, ErrorLevel, ErrorType } from "./getError";

export const configFromUrl = async (url: string): Promise<Configuration> => {
  try {
    const body: string = await request.get(url);

    return parseConfigString(body);
  } catch (error) {
    return getError(url, ErrorType.CONFIG_REQUEST_ERROR, ErrorLevel.ERROR, {
      error,
      url,
    });
  }
};
