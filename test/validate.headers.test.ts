import { fromObject } from "../src/fromObject";

describe("schema validation", () => {
  it("rejects an object with non-string headers", () => {
    expect(() =>
      fromObject({
        patternLibUrl: null,
        patternLibHeaders: {
          "-x-foo": 42,
        },
        breakpoints: null,
        theme: null,
        components: null,
        utils: null,
      } as any)
    ).toThrow();
  });
});
