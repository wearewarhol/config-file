import { fromObject } from "./fromObject";
import { Configuration } from "./types";
import { MalformedConfigError } from "./errors";

// Throws a syntax error for invalid JSON
export const fromJSON = (input: string): Configuration => {
  if (typeof input !== "string") {
    const type = input === null ? "null" : typeof input;
    const message = `Input must be a JSON-encoded string, got ${ type }`;
    throw new MalformedConfigError(message);
  }
  if (input.trim().length === 0) {
    throw new MalformedConfigError(`Input string is empty`);
  }
  let config;
  try {
    config = JSON.parse(input);
  } catch (error) {
    throw new MalformedConfigError(String(error));
  }
  return fromObject(config);
};
