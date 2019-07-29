import { fromObject } from "./fromObject";
import { Configuration } from "./types";
import { InvalidConfigError } from "./errors";

// Throws a syntax error for invalid JSON
export const fromJSON = (input: string): Configuration => {
  if (typeof input !== "string") {
    const type = input === null ? "null" : typeof input;
    const message = `Input must be a JSON-encoded string, got ${ type }`;
    throw new InvalidConfigError(message);
  }
  if (input.trim().length === 0) {
    throw new InvalidConfigError(`Input string is empty`);
  }
  const config = JSON.parse(input);
  return fromObject(config);
};
