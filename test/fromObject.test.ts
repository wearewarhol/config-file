import { fromObject } from "../src/index";


describe("fromObject()", () => {

  it("accepts a minimal configuration containing only minimal component definitions and a styleguide url", () => {
    const input = {
      styleguideUrl: "https://example.com",
      components: [{ source: ".foo" }, { source: ".bar" }],
    };
    expect(fromObject(input)).toEqual({
      styleguideUrl: "https://example.com",
      theme: null,
      breakpoints: [ 1000 ],
      components: [{
        name: null,
        componentUrl: "https://example.com",
        target: ".foo",
        source: ".foo",
      }, {
        name: null,
        componentUrl: "https://example.com",
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
        themeUrl: null,
        colors: {
          colorsUrl: null,
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
        themeUrl: "https://example.com/styleguide/theme",
        colors: {
          colorsUrl: "https://example.com/styleguide/theme/colors",
          sources: ".swatch",
          properties: [ "background-color", "color" ],
        },
      },
    };
    expect(fromObject(input)).toEqual({
      styleguideUrl: null,
      theme: {
        themeUrl: "https://example.com/styleguide/theme",
        colors: {
          colorsUrl: "https://example.com/styleguide/theme/colors",
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
        themeUrl: "https://warhol.io/components/theme",
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
        themeUrl: "https://warhol.io/components/theme",
        colors: {
          colorsUrl: "https://warhol.io/components/theme",
          sources: ".swatch",
          properties: [ "background-color", "color" ],
        },
      },
      components: [{
        name: null,
        componentUrl: "https://warhol.io/components",
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
