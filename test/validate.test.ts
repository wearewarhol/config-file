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
      () => fromObject({ components: [{ source: ".foo", componentUrl: "https://example.com" }] })
    ).not.toThrow();
  });

  it("requires at least one component if a component list is passed", () => {
    expect(
      () => fromObject({ components: [] }),
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

});
