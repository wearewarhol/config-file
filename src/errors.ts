export class InvalidConfigError extends Error {
  constructor (...args: ConstructorParameters<typeof Error>) {
    super(...args);
    this.stack = new Error().stack;
  }
  public name: string = "InvalidConfigError";
}
