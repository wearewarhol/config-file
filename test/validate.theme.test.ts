import { fromObject } from "../src/fromObject";

describe("schema validation for theme", () => {

  it("is not a required field", () => {
    expect( () => fromObject({}) ).not.toThrow();
    expect( () => fromObject({ theme: undefined }) ).not.toThrow();
    expect( () => fromObject({ theme: null }) ).not.toThrow();
  });

  it("does not require any members", () => {
    expect( () => fromObject({ theme: { } }) ).not.toThrow();
  });

  it("accepts null for all possible members", () => {
    expect( () => fromObject({
      theme: {
        themeUrl: null,
        colors: null,
        typography: null,
        icons: null,
      },
    }) ).not.toThrow();
  });

});
