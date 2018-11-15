import { Configuration } from "./types";

export enum ErrorLevel {
  ERROR = "ERROR",
}

export enum ErrorType {
  CONFIG_VALIDATION_ERROR = "CONFIG_VALIDATION_ERROR",
  CONFIG_PARSE_ERROR = "CONFIG_PARSE_ERROR",
  CONFIG_REQUEST_ERROR = "CONFIG_REQUEST_ERROR",
}

export const getError = (
  styleguideUrl: string | null,
  type: ErrorType,
  level: ErrorLevel,
  details: any,
): Configuration => ({
  styleguideUrl,
  breakpoints: [],
  components: [],
  issues: [{
    type,
    level,
    url: null,
    details,
  }],
});
