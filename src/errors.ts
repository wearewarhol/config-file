// Thrown when the configuration can't even be parsed
export class MalformedConfigError extends Error {
  constructor(...args: ConstructorParameters<typeof Error>) {
    super(...args);
    this.stack = new Error().stack;
  }
  public name = "MalformedConfigError";
}

// Thrown when the config can't be validated. The error message is, by
// convention, the JS output provided by the package better-ajv-errors
export class InvalidConfigError extends Error {
  constructor(...args: ConstructorParameters<typeof Error>) {
    super(...args);
    this.stack = new Error().stack;
  }
  public name = "InvalidConfigError";
}

// Thrown after validation when the configuration turns out to be parsable and
// structurally sound, but nonsensical anyway. The primary source of this error
// is the attempt to restrict utils to components that are not defined
export class NonsensicalConfigError extends Error {
  constructor(...args: ConstructorParameters<typeof Error>) {
    super(...args);
    this.stack = new Error().stack;
  }
  public name = "NonsensicalConfigError";
}
