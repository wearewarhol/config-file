import { fromObject } from "./fromObject";
import { Configuration } from "./types";

export const fromJSON = (input: string): Configuration => {
  const config = JSON.parse(input);
  return fromObject(config);
};
