import { fromObject } from "../src/fromObject";

describe("schema validation", () => {

  it("requires a typography url when there's no pattern lib oder theme url", () => {
    expect(
      () => fromObject({ theme: { typography: { sources: ".typo" } } }),
    ).toThrow(jasmine.objectContaining({ name: "TypeError" }));
    expect(
      () => fromObject({ theme: { typography: { typographyUrl: "http://foo.org", sources: ".typo" } } }),
    ).not.toThrow();
    expect(
      () => fromObject({ theme: { themeUrl: "http://foo.org", typography: { sources: ".typo" } } }),
    ).not.toThrow();
    expect(
      () => fromObject({ patternLibUrl: "http://foo.org", theme: { typography: { sources: ".typo" } } }),
    ).not.toThrow();
  });

  it("does not accept an empty typography element selector string", () => {
    expect(
      () => fromObject({ patternLibUrl: "http://example.com", theme: { typography: { sources: "" } } }),
    ).toThrow(jasmine.objectContaining({ name: "TypeError" }));
    expect(
      () => fromObject({ patternLibUrl: "http://example.com", theme: { typography: { sources: ".typo" } } }),
    ).not.toThrow();
  });

  it("does not accept an empty list of typography properties", () => {
    expect(
      () => fromObject({
        patternLibUrl: "http://example.com",
        theme: {
          typography: {
            sources: ".typo",
            properties: [],
          },
        },
      }),
    ).toThrow(jasmine.objectContaining({ name: "TypeError" }));
    expect(
      () => fromObject({
        patternLibUrl: "http://example.com",
        theme: {
          typography: {
            sources: ".typo",
            properties: [ "font-family", "font-size", "font-weight", "font-style" ],
          },
        },
      }),
    ).not.toThrow();
  });

});
