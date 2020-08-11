import { fromObject } from "../src/fromObject";

describe("schema validation", () => {
  it("accepts an empty object as input", () => {
    expect(() => fromObject({})).not.toThrow();
  });

  it("accepts an object full of nulls as input", () => {
    expect(() =>
      fromObject({
        patternLibUrl: null,
        patternLibHeaders: null,
        patternLibCookies: null,
        breakpoints: null,
        theme: null,
        components: null,
        utils: null,
      })
    ).not.toThrow();
  });

  it("accepts an object with a theme full of nulls as input", () => {
    expect(() =>
      fromObject({
        patternLibUrl: null,
        patternLibHeaders: null,
        breakpoints: null,
        theme: {
          colors: null,
          typography: null,
          icons: null,
        },
        components: null,
        utils: null,
      })
    ).not.toThrow();
  });

  it("rejects an object with additional properties", () => {
    expect(() =>
      fromObject({
        foo: 42,
        patternLibUrl: null,
        patternLibHeaders: null,
        breakpoints: null,
        theme: null,
        components: null,
        utils: null,
      } as any)
    ).toThrow();
  });
});
