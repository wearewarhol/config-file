import { fromObject } from "../src/fromObject";

describe("schema validation", () => {

  it("accepts an empty object as input", () => {
    expect( () => fromObject({}) ).not.toThrow();
  });

  xit("requires a component url when there's no styleguide url", () => {
    expect(
      () => fromObject({ components: [{ source: ".foo" }] }),
    ).toThrow(jasmine.objectContaining({ name: "TypeError" }));
  });

  it("requires at least one component", () => {
    expect(
      () => fromObject({ components: [] }),
    ).toThrow(jasmine.objectContaining({ name: "TypeError" }));
  });

  xit("requires a color url when there's no styleguide oder theme url", () => {
    expect(
      () => fromObject({
        theme: {
          colors: {
            sources: ".swatch",
          },
        },
        components: [{ source: ".foo" }],
      }),
    ).toThrow(jasmine.objectContaining({ name: "TypeError" }));
  });

});
