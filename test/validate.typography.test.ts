import { fromObject } from "../src/fromObject";

describe("schema validation", () => {
  it("is not a required field", () => {
    expect(() =>
      fromObject({ theme: { typography: undefined } })
    ).not.toThrow();
    expect(() => fromObject({ theme: { typography: null } })).not.toThrow();
  });

  it("requires a non-null typography url when there's no non-null pattern lib oder theme url", () => {
    expect(() =>
      fromObject({ theme: { typography: { sources: ".a" } } })
    ).toThrow(jasmine.objectContaining({ name: "InvalidConfigError" }));
    expect(() =>
      fromObject({
        theme: { typography: { typographyUrl: null, sources: ".a" } },
      })
    ).toThrow(jasmine.objectContaining({ name: "InvalidConfigError" }));
    expect(() =>
      fromObject({
        theme: {
          themeUrl: null,
          typography: { typographyUrl: null, sources: ".a" },
        },
      })
    ).toThrow(jasmine.objectContaining({ name: "InvalidConfigError" }));
    expect(() =>
      fromObject({
        theme: {
          themeUrl: null,
          typography: { typographyUrl: "http://foo.org", sources: ".a" },
        },
      })
    ).not.toThrow();
    expect(() =>
      fromObject({
        theme: { themeUrl: "http://foo.org", typography: { sources: ".a" } },
      })
    ).not.toThrow();
    expect(() =>
      fromObject({
        theme: {
          themeUrl: "http://foo.org",
          typography: { typographyUrl: null, sources: ".a" },
        },
      })
    ).not.toThrow();
    expect(() =>
      fromObject({
        patternLibUrl: "http://foo.org",
        theme: { typography: { sources: ".a" } },
      })
    ).not.toThrow();
    expect(() =>
      fromObject({
        patternLibUrl: null,
        theme: {
          themeUrl: null,
          typography: { typographyUrl: null, sources: ".a" },
        },
      })
    ).toThrow(jasmine.objectContaining({ name: "InvalidConfigError" }));
    expect(() =>
      fromObject({
        patternLibUrl: "http://foo.org",
        theme: {
          themeUrl: null,
          typography: { typographyUrl: null, sources: ".a" },
        },
      })
    ).not.toThrow();
  });

  it("does not accept an empty typography element selector string", () => {
    expect(() =>
      fromObject({
        patternLibUrl: "http://example.com",
        theme: { typography: { sources: "" } },
      })
    ).toThrow(jasmine.objectContaining({ name: "InvalidConfigError" }));
    expect(() =>
      fromObject({
        patternLibUrl: "http://example.com",
        theme: { typography: { sources: ".typo" } },
      })
    ).not.toThrow();
  });

  it("does not accept an empty list of typography properties", () => {
    expect(() =>
      fromObject({
        patternLibUrl: "http://example.com",
        theme: {
          typography: {
            sources: ".typo",
            properties: [],
          },
        },
      })
    ).toThrow(jasmine.objectContaining({ name: "InvalidConfigError" }));
    expect(() =>
      fromObject({
        patternLibUrl: "http://example.com",
        theme: {
          typography: {
            sources: ".typo",
            properties: [
              "font-family",
              "font-size",
              "font-weight",
              "font-style",
            ],
          },
        },
      })
    ).not.toThrow();
  });
});
