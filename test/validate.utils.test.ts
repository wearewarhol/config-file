import { fromObject } from "../src/fromObject";

describe("schema validation for utils", () => {

  it("is not a required field", () => {
    expect( () => fromObject({}) ).not.toThrow();
    expect( () => fromObject({ utils: undefined }) ).not.toThrow();
    expect( () => fromObject({ utils: null }) ).not.toThrow();
  });

  it("requires a non-null utils url when there's no pattern lib url", () => {
    expect(
      () => fromObject({ utils: { sources: [{ type: "rule", selector: ".foo" }] } }),
    ).toThrow(jasmine.objectContaining({ name: "TypeError" }));
    expect(
      () => fromObject({ patternLibUrl: null, utils: { sources: [{ type: "rule", selector: ".foo" }] } }),
    ).toThrow(jasmine.objectContaining({ name: "TypeError" }));
    expect(
      () => fromObject({ patternLibUrl: null, utils: { utilsUrl: null, sources: [{ type: "rule", selector: ".foo" }] } }),
    ).toThrow(jasmine.objectContaining({ name: "TypeError" }));
    expect(
      () => fromObject({ utils: { utilsUrl: null, sources: [{ type: "rule", selector: ".foo" }] } }),
    ).toThrow(jasmine.objectContaining({ name: "TypeError" }));
    expect(
      () => fromObject({ utils: { utilsUrl: "http://example.com", sources: [{ type: "rule", selector: ".foo" }] } }),
    ).not.toThrow();
    expect(
      () => fromObject({ patternLibUrl: null, utils: { utilsUrl: "http://example.com", sources: [{ type: "rule", selector: ".foo" }] } }),
    ).not.toThrow();
    expect(
      () => fromObject({ patternLibUrl: "http://example.com", utils: { utilsUrl: null, sources: [{ type: "rule", selector: "a" }] } }),
    ).not.toThrow();
  });

  it("works without any sources", () => {
    expect(
      () => fromObject({ utils: { utilsUrl: "http://example.com", sources: [] } }),
    ).not.toThrow();
  });

  it("complains about duplicate sources", () => {
    expect(
      () => fromObject({ utils: {
        utilsUrl: "http://example.com",
        sources: [{ type: "rule", selector: "a" }, { type: "rule", selector: "a" }] },
      }),
    ).toThrow();
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

  it("allows non-empty names on utils", () => {
    expect(
      () => fromObject({
        utils: {
          utilsUrl: "http://example.com",
          sources: [{ name: "hi!", type: "rule", selector: ".foo" }],
        },
      }),
    ).not.toThrow();
    expect(
      () => fromObject({
        utils: {
          utilsUrl: "http://example.com",
          sources: [{ name: "", type: "rule", selector: ".foo" }],
        },
      }),
    ).toThrow(jasmine.objectContaining({ name: "TypeError" }));
  });

  it("allows non-empty component targets in the component restrictions on utils", () => {
    expect(
      () => fromObject({
        utils: {
          utilsUrl: "http://example.com",
          sources: [{ name: "hi!", type: "rule", selector: ".foo", components: [] }],
        },
      }),
    ).not.toThrow();
    expect(
      () => fromObject({
        utils: {
          utilsUrl: "http://example.com",
          sources: [{ name: "hi!", type: "rule", selector: ".foo", components: [ ".hello" ] }],
        },
      }),
    ).not.toThrow();
    expect(
      () => fromObject({
        utils: {
          utilsUrl: "http://example.com",
          sources: [{ name: "hi!", type: "rule", selector: ".foo", components: [ "" ] }],
        },
      }),
    ).toThrow(jasmine.objectContaining({ name: "TypeError" }));
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
