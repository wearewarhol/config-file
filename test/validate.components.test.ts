import { fromObject } from "../src/fromObject";

describe("schema validation", () => {
  it("is not a required field", () => {
    expect(() => fromObject({})).not.toThrow();
    expect(() => fromObject({ components: undefined })).not.toThrow();
    expect(() => fromObject({ components: null })).not.toThrow();
  });

  it("requires a component url when there's no pattern lib url", () => {
    expect(() => fromObject({ components: [{ source: ".foo" }] })).toThrow(
      jasmine.objectContaining({ name: "InvalidConfigError" })
    );
    expect(() =>
      fromObject({ patternLibUrl: null, components: [{ source: ".foo" }] })
    ).toThrow(jasmine.objectContaining({ name: "InvalidConfigError" }));
    expect(() =>
      fromObject({ components: [{ source: ".foo", componentUrl: null }] })
    ).toThrow(jasmine.objectContaining({ name: "InvalidConfigError" }));
    expect(() =>
      fromObject({
        patternLibUrl: null,
        components: [{ source: ".foo", componentUrl: null }],
      })
    ).toThrow(jasmine.objectContaining({ name: "InvalidConfigError" }));
    expect(() =>
      fromObject({
        patternLibUrl: "https://example.com",
        components: [{ source: ".foo" }],
      })
    ).not.toThrow();
    expect(() =>
      fromObject({
        patternLibUrl: "https://example.com",
        components: [{ source: ".foo", componentUrl: null }],
      })
    ).not.toThrow();
    expect(() =>
      fromObject({
        components: [{ source: ".foo", componentUrl: "https://example.com" }],
      })
    ).not.toThrow();
    expect(() =>
      fromObject({
        patternLibUrl: "https://example.com",
        components: [{ source: ".foo", componentUrl: "https://example.com" }],
      })
    ).not.toThrow();
  });

  it("works with an empty component list", () => {
    expect(() => fromObject({ components: [] })).not.toThrow();
  });

  it("does not accept empty selector strings or names on components", () => {
    expect(() =>
      fromObject({
        patternLibUrl: "http://example.com",
        components: [{ source: "" }],
      })
    ).toThrow(jasmine.objectContaining({ name: "InvalidConfigError" }));
    expect(() =>
      fromObject({
        patternLibUrl: "http://example.com",
        components: [{ source: "a" }],
      })
    ).not.toThrow();
    expect(() =>
      fromObject({
        patternLibUrl: "http://example.com",
        components: [{ source: "a", target: "" }],
      })
    ).toThrow(jasmine.objectContaining({ name: "InvalidConfigError" }));
    expect(() =>
      fromObject({
        patternLibUrl: "http://example.com",
        components: [{ source: "a", target: "b" }],
      })
    ).not.toThrow();
    expect(() =>
      fromObject({
        patternLibUrl: "http://example.com",
        components: [{ source: "a", target: "b", name: "" }],
      })
    ).toThrow(jasmine.objectContaining({ name: "InvalidConfigError" }));
    expect(() =>
      fromObject({
        patternLibUrl: "http://example.com",
        components: [{ source: "a", target: "b", name: "c" }],
      })
    ).not.toThrow();
  });

  it("does accept missing component names", () => {
    expect(() =>
      fromObject({
        patternLibUrl: "http://example.com",
        components: [{ source: ".foo" }],
      })
    ).not.toThrow();
  });

  it("complains about duplicate sources", () => {
    expect(() =>
      fromObject({
        patternLibUrl: "https://example.com",
        components: [{ source: ".foo" }, { source: ".foo" }],
      })
    ).toThrow();
  });
});
