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
      components: [{ source: ".foo", componentUrl: "https://asdf.com" }],
      theme: {
        themeUrl: "https://asdf.com/theme",
        colors: {
          sources: ".swatch",
        },
      },
    };
    expect(fromObject(input)).toEqual({
      styleguideUrl: null,
      theme: {
        themeUrl: "https://asdf.com/theme",
        colors: {
          colorsUrl: "https://asdf.com/theme",
          sources: ".swatch",
          properties: [ "background-color" ],
        },
        typography: null,
      },
      breakpoints: [ 1000 ],
      components: [{ name: null, componentUrl: "https://asdf.com", source: ".foo", target: ".foo" }],
    });
  });

  it("reads a full theme color definition", () => {
    const input = {
      components: [{ source: ".foo", componentUrl: "https://asdf.com" }],
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
        typography: null,
      },
      breakpoints: [ 1000 ],
      components: [{ name: null, componentUrl: "https://asdf.com", source: ".foo", target: ".foo" }],
    });
  });

  it("reads a minimal theme typography definition", () => {
    const input = {
      components: [{ source: ".foo", componentUrl: "https://asdf.com" }],
      theme: {
        themeUrl: "https://asdf.com/theme",
        typography: {
          sources: ".typo",
        },
      },
    };
    expect(fromObject(input)).toEqual({
      styleguideUrl: null,
      theme: {
        themeUrl: "https://asdf.com/theme",
        colors: null,
        typography: {
          typographyUrl: "https://asdf.com/theme",
          sources: ".typo",
          properties: [ "font-family", "font-size", "font-weight", "font-style" ],
        },
      },
      breakpoints: [ 1000 ],
      components: [{ name: null, componentUrl: "https://asdf.com", source: ".foo", target: ".foo" }],
    });
  });

  it("reads a full theme typography definition", () => {
    const input = {
      components: [{ source: ".foo", componentUrl: "https://asdf.com" }],
      theme: {
        themeUrl: "https://example.com/styleguide/theme",
        typography: {
          typographyUrl: "https://example.com/styleguide/theme/typography",
          sources: ".typo",
          properties: [ "font-family", "font-size", "font-weight", "font-style", "color" ],
        },
      },
    };
    expect(fromObject(input)).toEqual({
      styleguideUrl: null,
      theme: {
        themeUrl: "https://example.com/styleguide/theme",
        colors: null,
        typography: {
          typographyUrl: "https://example.com/styleguide/theme/typography",
          sources: ".typo",
          properties: [ "font-family", "font-size", "font-weight", "font-style", "color" ],
        },
      },
      breakpoints: [ 1000 ],
      components: [{ name: null, componentUrl: "https://asdf.com", source: ".foo", target: ".foo" }],
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
        typography: {
          typographyUrl: "https://warhol.io/components/theme/typography",
          sources: ".typo",
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
        typography: {
          typographyUrl: "https://warhol.io/components/theme/typography",
          sources: ".typo",
          properties: [ "font-family", "font-size", "font-weight", "font-style" ],
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
