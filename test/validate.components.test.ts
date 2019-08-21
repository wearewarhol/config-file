import { fromObject } from "../src/fromObject";

describe("schema validation", () => {

  it("requires a component url when there's no pattern lib url", () => {
    expect(
      () => fromObject({ components: [{ source: ".foo" }] }),
    ).toThrow(jasmine.objectContaining({ name: "TypeError" }));
    expect(
      () => fromObject({ components: [{ source: ".foo", componentUrl: "https://example.com" }] }),
    ).not.toThrow();
  });

  it("requires at least one component if a component list is passed", () => {
    expect(
      () => fromObject({ components: [] }),
    ).toThrow(jasmine.objectContaining({ name: "TypeError" }));
  });

  it("does not accept empty selector strings or names on components", () => {
    expect(
      () => fromObject({ patternLibUrl: "http://example.com", components: [{ source: "" }] }),
    ).toThrow(jasmine.objectContaining({ name: "TypeError" }));
    expect(
      () => fromObject({ patternLibUrl: "http://example.com", components: [{ source: "a" }] }),
    ).not.toThrow();
    expect(
      () => fromObject({ patternLibUrl: "http://example.com", components: [{ source: "a", target: "" }] }),
    ).toThrow(jasmine.objectContaining({ name: "TypeError" }));
    expect(
      () => fromObject({ patternLibUrl: "http://example.com", components: [{ source: "a", target: "b" }] }),
    ).not.toThrow();
    expect(
      () => fromObject({ patternLibUrl: "http://example.com", components: [{ source: "a", target: "b", name: "" }] }),
    ).toThrow(jasmine.objectContaining({ name: "TypeError" }));
    expect(
      () => fromObject({ patternLibUrl: "http://example.com", components: [{ source: "a", target: "b", name: "c" }] }),
    ).not.toThrow();
  });

});
