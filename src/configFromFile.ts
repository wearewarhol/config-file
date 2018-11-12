import * as fs from "fs-extra";
import { parseConfigString } from "./parseConfigString";
import { Configuration } from "./types";
import { getError, ErrorType, ErrorLevel } from "./getError";

export const configFromFile = async (path: string): Promise<Configuration> => {
  try {
    const content = await fs.readFile(path, { encoding: "utf-8" });

    return parseConfigString(content);
  } catch (error) {
    return getError(null, ErrorType.CONFIG_REQUEST_ERROR, ErrorLevel.ERROR, {
      error,
      path,
    });
  }
};
