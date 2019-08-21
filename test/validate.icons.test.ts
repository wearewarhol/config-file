import { fromObject } from "../src/fromObject";

describe("schema validation for icons", () => {

  it("requires a icon url when there's no pattern lib oder theme url", () => {
    expect(
      () => fromObject({ theme: { icons: { sources: ".icon", isFont: true } } }),
    ).toThrow(jasmine.objectContaining({ name: "TypeError" }));
    expect(
      () => fromObject({ theme: { icons: { iconsUrl: "http://foo.org", sources: ".icon", isFont: true } } }),
    ).not.toThrow();
    expect(
      () => fromObject({ theme: { themeUrl: "http://foo.org", icons: { sources: ".icon", isFont: true } } }),
    ).not.toThrow();
    expect(
      () => fromObject({ patternLibUrl: "http://foo.org", theme: { icons: { sources: ".icon", isFont: true } } }),
    ).not.toThrow();
  });

  it("does not accept an empty icon element selector string", () => {
    expect(
      () => fromObject({ patternLibUrl: "http://example.com", theme: { icons: { sources: "", isFont: true } } }),
    ).toThrow(jasmine.objectContaining({ name: "TypeError" }));
    expect(
      () => fromObject({ patternLibUrl: "http://example.com", theme: { icons: { sources: ".foo", isFont: true } } }),
    ).not.toThrow();
  });

  it("does accept both true and false for isFont", () => {
    expect(
      () => fromObject({ patternLibUrl: "http://example.com", theme: { icons: { sources: ".foo", isFont: true } } }),
    ).not.toThrow();
    expect(
      () => fromObject({ patternLibUrl: "http://example.com", theme: { icons: { sources: ".foo", isFont: false } } }),
    ).not.toThrow();
  });

});
