import { fromObject } from "../src/fromObject";

describe("schema validation for icons", () => {

  it("is not a required field", () => {
    expect( () => fromObject({ theme: { icons: undefined } }) ).not.toThrow();
    expect( () => fromObject({ theme: { icons: null } }) ).not.toThrow();
  });

  it("requires a non-null icons url when there's no non-null pattern lib oder theme url", () => {
    expect(
      () => fromObject({ theme: { icons: { sources: ".a", type: "font" } } }),
    ).toThrow(jasmine.objectContaining({ name: "TypeError" }));
    expect(
      () => fromObject({ theme: { icons: { iconsUrl: null, sources: ".a", type: "font" } } }),
    ).toThrow(jasmine.objectContaining({ name: "TypeError" }));
    expect(
      () => fromObject({ theme: { themeUrl: null, icons: { iconsUrl: null, sources: ".a", type: "font" } } }),
    ).toThrow(jasmine.objectContaining({ name: "TypeError" }));
    expect(
      () => fromObject({ theme: { themeUrl: null, icons: { iconsUrl: "http://foo.org", sources: ".a", type: "font" } } }),
    ).not.toThrow();
    expect(
      () => fromObject({ theme: { themeUrl: "http://foo.org", icons: { sources: ".a", type: "font" } } }),
    ).not.toThrow();
    expect(
      () => fromObject({ theme: { themeUrl: "http://foo.org", icons: { iconsUrl: null, sources: ".a", type: "font" } } }),
    ).not.toThrow();
    expect(
      () => fromObject({ patternLibUrl: "http://foo.org", theme: { icons: { sources: ".a", type: "font" } } }),
    ).not.toThrow();
    expect(
      () => fromObject({ patternLibUrl: null, theme: { themeUrl: null, icons: { iconsUrl: null, sources: ".a", type: "font" } } }),
    ).toThrow(jasmine.objectContaining({ name: "TypeError" }));
    expect(
      () => fromObject({ patternLibUrl: "http://foo.org", theme: { themeUrl: null, icons: { iconsUrl: null, sources: ".a", type: "font" } } }),
    ).not.toThrow();
  });

  it("does not accept an empty icon element selector string", () => {
    expect(
      () => fromObject({ patternLibUrl: "http://example.com", theme: { icons: { sources: "", type: "font" } } }),
    ).toThrow(jasmine.objectContaining({ name: "TypeError" }));
    expect(
      () => fromObject({ patternLibUrl: "http://example.com", theme: { icons: { sources: ".foo", type: "font" } } }),
    ).not.toThrow();
  });

});
