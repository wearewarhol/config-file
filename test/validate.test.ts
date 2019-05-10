import { fromObject } from "../src/fromObject";

describe("schema validation", () => {

  it("accepts an empty object as input", () => {
    expect( () => fromObject({}) ).not.toThrow();
  });

  it("requires a component url when there's no styleguide url", () => {
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
      () => fromObject({ styleguideUrl: "http://example.com", components: [{ source: "" }] }),
    ).toThrow(jasmine.objectContaining({ name: "TypeError" }));
    expect(
      () => fromObject({ styleguideUrl: "http://example.com", components: [{ source: "a", target: "" }] }),
    ).toThrow(jasmine.objectContaining({ name: "TypeError" }));
    expect(
      () => fromObject({ styleguideUrl: "http://example.com", components: [{ source: "a", target: "b", name: "" }] }),
    ).toThrow(jasmine.objectContaining({ name: "TypeError" }));
  });

  it("requires a color url when there's no styleguide oder theme url", () => {
    expect(
      () => fromObject({
        theme: {
          colors: {
            sources: ".swatch",
          },
        },
      }),
    ).toThrow(jasmine.objectContaining({ name: "TypeError" }));
  });

  it("does not accept an empty color element selector string", () => {
    expect(
      () => fromObject({
        styleguideUrl: "http://example.com",
        theme: {
          colors: {
            sources: "",
          },
        },
      }),
    ).toThrow(jasmine.objectContaining({ name: "TypeError" }));
  });

  it("does not accept an empty list of color properties", () => {
    expect(
      () => fromObject({
        styleguideUrl: "http://example.com",
        theme: {
          colors: {
            sources: ".swatch",
            properties: [],
          },
        },
      }),
    ).toThrow(jasmine.objectContaining({ name: "TypeError" }));
  });

  it("requires a typography url when there's no styleguide oder theme url", () => {
    expect(
      () => fromObject({
        theme: {
          typography: {
            sources: ".typo",
          },
        },
      }),
    ).toThrow(jasmine.objectContaining({ name: "TypeError" }));
  });

  it("does not accept an empty typography element selector string", () => {
    expect(
      () => fromObject({
        styleguideUrl: "http://example.com",
        theme: {
          typography: {
            sources: "",
          },
        },
      }),
    ).toThrow(jasmine.objectContaining({ name: "TypeError" }));
  });

  it("does not accept an empty list of typography properties", () => {
    expect(
      () => fromObject({
        styleguideUrl: "http://example.com",
        theme: {
          typography: {
            sources: ".typo",
            properties: [],
          },
        },
      }),
    ).toThrow(jasmine.objectContaining({ name: "TypeError" }));
  });

});
