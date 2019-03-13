import { fromObject } from "../src/index";


describe("fromObject()", () => {

  it("accepts a minimal configuration containing only minimal component definitions", () => {
    const input = {
      components: [{ source: ".foo" }, { source: ".bar" }],
    };
    expect(fromObject(input)).toEqual({
      styleguideUrl: null,
      theme: null,
      breakpoints: [ 1000 ],
      components: [{
        name: null,
        componentUrl: null,
        target: ".foo",
        source: ".foo",
      }, {
        name: null,
        componentUrl: null,
        target: ".bar",
        source: ".bar",
      }],
    });
  });

  it("respects component's target, name and url properties", () => {
    const input = {
      components: [{
        name: "Magic Slider",
        componentUrl: "https://google.de/",
        source: ".foo",
        target: ".bar",
      }],
    };
    expect(fromObject(input)).toEqual({
      styleguideUrl: null,
      theme: null,
      breakpoints: [ 1000 ],
      components: [{
        name: "Magic Slider",
        componentUrl: "https://google.de/",
        source: ".foo",
        target: ".bar",
      }],
    });
  });

  it("reads a minimal theme color definition", () => {
    const input = {
      components: [{ source: ".foo" }],
      theme: {
        colors: {
          sources: ".swatch",
        },
      },
    };
    expect(fromObject(input)).toEqual({
      styleguideUrl: null,
      theme: {
        colors: {
          sources: ".swatch",
          properties: [ "background-color" ],
        },
      },
      breakpoints: [ 1000 ],
      components: [{ name: null, componentUrl: null, source: ".foo", target: ".foo" }],
    });
  });

  it("reads a full theme color definition", () => {
    const input = {
      components: [{ source: ".foo" }],
      theme: {
        colors: {
          sources: ".swatch",
          properties: [ "background-color", "color" ],
        },
      },
    };
    expect(fromObject(input)).toEqual({
      styleguideUrl: null,
      theme: {
        colors: {
          sources: ".swatch",
          properties: [ "background-color", "color" ],
        },
      },
      breakpoints: [ 1000 ],
      components: [{ name: null, componentUrl: null, source: ".foo", target: ".foo" }],
    });
  });

  it("accepts a full configuration", () => {
    const input = {
      styleguideUrl: "https://warhol.io/components",
      breakpoints: [ 300, 800, 1200 ],
      theme: {
        colors: {
          sources: ".swatch",
          properties: [ "background-color", "color" ],
        },
      },
      components: [
        { source: ".foo" },
        {
          name: "Magic Slider",
          componentUrl: "https://google.de/",
          source: ".foo",
          target: ".bar",
        },
      ],
    };
    expect(fromObject(input)).toEqual({
      styleguideUrl: "https://warhol.io/components",
      breakpoints: [ 300, 800, 1200 ],
      theme: {
        colors: {
          sources: ".swatch",
          properties: [ "background-color", "color" ],
        },
      },
      components: [{
        name: null,
        componentUrl: null,
        target: ".foo",
        source: ".foo",
      }, {
        name: "Magic Slider",
        componentUrl: "https://google.de/",
        source: ".foo",
        target: ".bar",
      }],
    });
  });

});
