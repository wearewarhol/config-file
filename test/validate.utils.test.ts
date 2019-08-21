import { fromObject } from "../src/fromObject";

describe("schema validation for utils", () => {

  it("requires a utils url when there's no pattern lib url", () => {
    expect(
      () => fromObject({ utils: { sources: [{ type: "rule", selector: ".foo" }] } }),
    ).toThrow(jasmine.objectContaining({ name: "TypeError" }));
    expect(
      () => fromObject({ utils: { utilsUrl: "http://example.com", sources: [{ type: "rule", selector: ".foo" }] } }),
    ).not.toThrow();
    expect(
      () => fromObject({ patternLibUrl: "http://example.com", utils: { sources: [{ type: "rule", selector: "a" }] } }),
    ).not.toThrow();
  });

  it("requires at least one source if utils are defined", () => {
    expect(
      () => fromObject({ utils: { utilsUrl: "http://example.com", sources: [] } }),
    ).toThrow(jasmine.objectContaining({ name: "TypeError" }));
  });

  it("requires type and selector fields on utils", () => {
    expect(
      () => fromObject({ utils: { utilsUrl: "http://example.com", sources: [{} as any] } }),
    ).toThrow(jasmine.objectContaining({ name: "TypeError" }));
    expect(
      () => fromObject({ utils: { utilsUrl: "http://example.com", sources: [{ type: "rule" } as any] } }),
    ).toThrow(jasmine.objectContaining({ name: "TypeError" }));
    expect(
      () => fromObject({ utils: { utilsUrl: "http://example.com", sources: [{ type: "rule", selector: ".foo" }] } }),
    ).not.toThrow();
  });

  it("accepts only 'rule' and 'element' as types on utils", () => {
    expect(
      () => fromObject({ utils: { utilsUrl: "http://foo.com", sources: [{ type: "a", selector: ".foo" } as any] } }),
    ).toThrow();
    expect(
      () => fromObject({ utils: { utilsUrl: "http://foo.com", sources: [{ type: "rule", selector: ".foo" }] } }),
    ).not.toThrow();
    expect(
      () => fromObject({ utils: { utilsUrl: "http://foo.com", sources: [{ type: "element", selector: ".foo" }] } }),
    ).not.toThrow();
  });

  it("does not accept empty elector strings", () => {
    expect(
      () => fromObject({ utils: { utilsUrl: "http://foo.com", sources: [{ type: "element", selector: "" }] } }),
    ).toThrow();
  });

});
