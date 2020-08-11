import { fromObject } from "../src/fromObject";

describe("schema validation", () => {

  it("rejects when a cookie is empty", () => {
    expect( () => fromObject({
      patternLibUrl: null,
      patternLibCookies: [{}],
      breakpoints: null,
      theme: null,
      components: null,
      utils: null,
    } as any) ).toThrow();
  });

  it("rejects when a cookie is missing a name", () => {
    expect( () => fromObject({
      patternLibUrl: null,
      patternLibCookies: [{
        value: "42",
      }],
      breakpoints: null,
      theme: null,
      components: null,
      utils: null,
    } as any) ).toThrow();
  });

  it("rejects when a cookie has a non-string value", () => {
    expect( () => fromObject({
      patternLibUrl: null,
      patternLibCookies: [{
        name: "hello",
        value: 42,
      }],
      breakpoints: null,
      theme: null,
      components: null,
      utils: null,
    } as any) ).toThrow();
  });

  it("rejects when a cookie has an invalid same-site value", () => {
    expect( () => fromObject({
      patternLibUrl: null,
      patternLibCookies: [{
        name: "hello",
        value: "42",
        sameSite: "Foobar",
      }],
      breakpoints: null,
      theme: null,
      components: null,
      utils: null,
    } as any) ).toThrow();
  });

  it("rejects when a cookie has an invalid expires value", () => {
    expect( () => fromObject({
      patternLibUrl: null,
      patternLibCookies: [{
        name: "hello",
        value: "42",
        expires: 9000.1,
      }],
      breakpoints: null,
      theme: null,
      components: null,
      utils: null,
    } as any) ).toThrow();
  });

});
