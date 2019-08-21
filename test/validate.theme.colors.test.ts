import { fromObject } from "../src/fromObject";

describe("schema validation for colors", () => {

  it("requires a color url when there's no pattern lib oder theme url", () => {
    expect(
      () => fromObject({ theme: { colors: { sources: ".swatch" } } }),
    ).toThrow(jasmine.objectContaining({ name: "TypeError" }));
    expect(
      () => fromObject({ theme: { colors: { colorsUrl: "http://foo.org", sources: ".swatch" } } }),
    ).not.toThrow();
    expect(
      () => fromObject({ theme: { themeUrl: "http://foo.org", colors: { sources: ".swatch" } } }),
    ).not.toThrow();
    expect(
      () => fromObject({ patternLibUrl: "http://foo.org", theme: { colors: { sources: ".swatch" } } }),
    ).not.toThrow();
  });

  it("does not accept an empty color element selector string", () => {
    expect(
      () => fromObject({ patternLibUrl: "http://example.com", theme: { colors: { sources: "" } } }),
    ).toThrow(jasmine.objectContaining({ name: "TypeError" }));
    expect(
      () => fromObject({ patternLibUrl: "http://example.com", theme: { colors: { sources: ".foo" } } }),
    ).not.toThrow();
  });

  it("does not accept an empty list of color properties", () => {
    expect(
      () => fromObject({ patternLibUrl: "http://foo.com", theme: { colors: { sources: ".swatch", properties: [] } } }),
    ).toThrow(jasmine.objectContaining({ name: "TypeError" }));
  });

  it("does not allow non-color values as properties", () => {
    expect(
      () => fromObject({
        patternLibUrl: "http://foo.com",
        theme: { colors: { sources: ".swatch", properties: [ "foo" ] } },
      }),
    ).toThrow(jasmine.objectContaining({ name: "TypeError" }));
    expect(
      () => fromObject({
        patternLibUrl: "http://foo.com",
        theme: { colors: { sources: ".swatch", properties: [ "background-color", "foo" ] } },
      }),
    ).toThrow(jasmine.objectContaining({ name: "TypeError" }));
    expect(
      () => fromObject({
        patternLibUrl: "http://foo.com",
        theme: { colors: { sources: ".swatch", properties: [ "color", "background-color" ] } },
      }),
    ).not.toThrow(jasmine.objectContaining({ name: "TypeError" }));
  });

});
