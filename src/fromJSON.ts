import { fromObject } from "./fromObject";
import { Configuration } from "./types";

// Throws a syntax error for invalid JSON
export const fromJSON = (input: string): Configuration => {
  const config = JSON.parse(input);
  return fromObject(config);
};
