import { fromObject, Configuration } from "../src/index";


describe("fromObject()", () => {

  it("accepts an empty configuration", () => {
    const input = {};
    expect(fromObject(input)).toEqual({
      patternLibUrl: null,
      patternLibHeaders: {},
      theme: null,
      utils: null,
      breakpoints: [ 1000 ],
      components: [],
    });
  });

  it("turns 'null' components into empty arrays", () => {
    const input = { components: null };
    expect(fromObject(input)).toEqual({
      patternLibUrl: null,
      patternLibHeaders: {},
      theme: null,
      utils: null,
      breakpoints: [ 1000 ],
      components: [],
    });
  });

  it("accepts a minimal configuration containing only minimal component definitions and a pattern lib URL", () => {
    const input = {
      patternLibUrl: "https://example.com",
      components: [{ source: ".foo" }, { source: ".bar" }],
    };
    expect(fromObject(input)).toEqual({
      patternLibUrl: "https://example.com",
      patternLibHeaders: {},
      theme: null,
      utils: null,
      breakpoints: [ 1000 ],
      components: [{
        name: ".foo",
        componentUrl: "https://example.com",
        target: ".foo",
        source: ".foo",
      }, {
        name: ".bar",
        componentUrl: "https://example.com",
        target: ".bar",
        source: ".bar",
      }],
    });
  });

  it("accepts a minimal configuration with a null value for patternLibHeaders", () => {
    const input = {
      patternLibUrl: "https://example.com",
      patternLibHeaders: null,
      components: [{ source: ".foo" }, { source: ".bar" }],
    };
    expect(fromObject(input)).toEqual({
      patternLibUrl: "https://example.com",
      patternLibHeaders: {},
      theme: null,
      utils: null,
      breakpoints: [ 1000 ],
      components: [{
        name: ".foo",
        componentUrl: "https://example.com",
        target: ".foo",
        source: ".foo",
      }, {
        name: ".bar",
        componentUrl: "https://example.com",
        target: ".bar",
        source: ".bar",
      }],
    });
  });

  it("accepts a minimal configuration with an empty value for patternLibHeaders", () => {
    const input = {
      patternLibUrl: "https://example.com",
      patternLibHeaders: {},
      components: [{ source: ".foo" }, { source: ".bar" }],
    };
    expect(fromObject(input)).toEqual({
      patternLibUrl: "https://example.com",
      patternLibHeaders: {},
      theme: null,
      utils: null,
      breakpoints: [ 1000 ],
      components: [{
        name: ".foo",
        componentUrl: "https://example.com",
        target: ".foo",
        source: ".foo",
      }, {
        name: ".bar",
        componentUrl: "https://example.com",
        target: ".bar",
        source: ".bar",
      }],
    });
  });

  it("accepts a minimal configuration with non-empty patternLibHeaders", () => {
    const input = {
      patternLibUrl: "https://example.com",
      patternLibHeaders: {
        "DNT": "1"
      },
      components: [{ source: ".foo" }, { source: ".bar" }],
    };
    expect(fromObject(input)).toEqual({
      patternLibUrl: "https://example.com",
      patternLibHeaders: {
        "DNT": "1"
      },
      theme: null,
      utils: null,
      breakpoints: [ 1000 ],
      components: [{
        name: ".foo",
        componentUrl: "https://example.com",
        target: ".foo",
        source: ".foo",
      }, {
        name: ".bar",
        componentUrl: "https://example.com",
        target: ".bar",
        source: ".bar",
      }],
    });
  });

  it("accepts a minimal configuration containing complete component definitions and a pattern lib URL", () => {
    const input = {
      patternLibUrl: "https://example.com",
      components: [{ source: ".foo", target: ".bar", name: "MyFoo", componentUrl: "https://example.com" }],
    };
    expect(fromObject(input)).toEqual({
      patternLibUrl: "https://example.com",
      patternLibHeaders: {},
      theme: null,
      utils: null,
      breakpoints: [ 1000 ],
      components: [{
        source: ".foo",
        target: ".bar",
        name: "MyFoo",
        componentUrl: "https://example.com",
      }],
    });
  });

  it("accepts component fields with undefined as values", () => {
    const input = {
      patternLibUrl: "https://example.com",
      components: [{ source: ".foo", target: undefined }, { source: ".bar", name: undefined }],
    };
    expect(fromObject(input)).toEqual({
      patternLibUrl: "https://example.com",
      patternLibHeaders: {},
      theme: null,
      utils: null,
      breakpoints: [ 1000 ],
      components: [{
        name: ".foo",
        componentUrl: "https://example.com",
        target: ".foo",
        source: ".foo",
      }, {
        name: ".bar",
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
      patternLibUrl: null,
      patternLibHeaders: {},
      theme: null,
      utils: null,
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
      patternLibUrl: null,
      patternLibHeaders: {},
      theme: {
        themeUrl: "https://asdf.com/theme",
        colors: {
          colorsUrl: "https://asdf.com/theme",
          sources: ".swatch",
          properties: [ "background-color" ],
        },
        typography: null,
        icons: null,
      },
      utils: null,
      breakpoints: [ 1000 ],
      components: [{ name: ".foo", componentUrl: "https://asdf.com", source: ".foo", target: ".foo" }],
    });
  });

  it("reads a full theme color definition", () => {
    const input = {
      components: [{ source: ".foo", componentUrl: "https://asdf.com" }],
      theme: {
        themeUrl: "https://example.com/patternlib/theme",
        colors: {
          colorsUrl: "https://example.com/patternlib/theme/colors",
          sources: ".swatch",
          properties: [ "background-color", "color" ],
        },
      },
    };
    expect(fromObject(input)).toEqual({
      patternLibUrl: null,
      patternLibHeaders: {},
      theme: {
        themeUrl: "https://example.com/patternlib/theme",
        colors: {
          colorsUrl: "https://example.com/patternlib/theme/colors",
          sources: ".swatch",
          properties: [ "background-color", "color" ],
        },
        typography: null,
        icons: null,
      },
      utils: null,
      breakpoints: [ 1000 ],
      components: [{ name: ".foo", componentUrl: "https://asdf.com", source: ".foo", target: ".foo" }],
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
      patternLibUrl: null,
      patternLibHeaders: {},
      theme: {
        themeUrl: "https://asdf.com/theme",
        colors: null,
        typography: {
          typographyUrl: "https://asdf.com/theme",
          sources: ".typo",
          properties: [ "font-family", "font-size", "font-weight", "font-style" ],
        },
        icons: null,
      },
      utils: null,
      breakpoints: [ 1000 ],
      components: [{ name: ".foo", componentUrl: "https://asdf.com", source: ".foo", target: ".foo" }],
    });
  });

  it("reads a full theme typography definition", () => {
    const input = {
      components: [{ source: ".foo", componentUrl: "https://asdf.com" }],
      theme: {
        themeUrl: "https://example.com/patternlib/theme",
        typography: {
          typographyUrl: "https://example.com/patternlib/theme/typography",
          sources: ".typo",
          properties: [ "font-family", "font-size", "font-weight", "font-style", "color" ],
        },
      },
    };
    expect(fromObject(input)).toEqual({
      patternLibUrl: null,
      patternLibHeaders: {},
      theme: {
        themeUrl: "https://example.com/patternlib/theme",
        colors: null,
        typography: {
          typographyUrl: "https://example.com/patternlib/theme/typography",
          sources: ".typo",
          properties: [ "font-family", "font-size", "font-weight", "font-style", "color" ],
        },
        icons: null,
      },
      utils: null,
      breakpoints: [ 1000 ],
      components: [{ name: ".foo", componentUrl: "https://asdf.com", source: ".foo", target: ".foo" }],
    });
  });

  it("reads a minimal theme icon definition", () => {
    const input = {
      theme: {
        themeUrl: "https://asdf.com/theme",
        icons: {
          sources: ".icon",
          type: "font" as "font",
        },
      },
    };
    expect(fromObject(input)).toEqual({
      patternLibUrl: null,
      patternLibHeaders: {},
      theme: {
        themeUrl: "https://asdf.com/theme",
        colors: null,
        typography: null,
        icons: {
          iconsUrl: "https://asdf.com/theme",
          sources: ".icon",
          type: "font",
        },
      },
      utils: null,
      breakpoints: [ 1000 ],
      components: [],
    });
  });

  it("reads a full theme icon definition", () => {
    const input = {
      theme: {
        themeUrl: "https://asdf.com/theme",
        icons: {
          iconsUrl: "https://asdf.com/theme/icons",
          sources: ".icon",
          type: "font" as "font",
        },
      },
    };
    expect(fromObject(input)).toEqual({
      patternLibUrl: null,
      patternLibHeaders: {},
      theme: {
        themeUrl: "https://asdf.com/theme",
        colors: null,
        typography: null,
        icons: {
          iconsUrl: "https://asdf.com/theme/icons",
          sources: ".icon",
          type: "font",
        },
      },
      utils: null,
      breakpoints: [ 1000 ],
      components: [],
    });
  });

  it("accepts a full configuration", () => {
    const input = {
      patternLibUrl: "https://warhol.io/components",
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
        icons: {
          iconsUrl: "https://warhol.io/components/theme/icons",
          sources: ".icon",
          type: "font" as "font",
        },
      },
      utils: {
        utilsUrl: "https://warhol.io/components/utils",
        sources: [
          { type: "rule" as const, selector: ".align-left" },
          { type: "rule" as const, selector: ".align-right", name: "Right" },
          { type: "element" as const, selector: ".shadow", components: [ ".foo", ".bar" ] },
        ],
      },
      components: [
        { source: ".foo" },
        {
          name: "Magic Slider",
          componentUrl: "https://google.de/",
          source: ".slider",
          target: ".bar",
        },
      ],
    };
    expect(fromObject(input)).toEqual({
      patternLibUrl: "https://warhol.io/components",
      patternLibHeaders: {},
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
        icons: {
          iconsUrl: "https://warhol.io/components/theme/icons",
          sources: ".icon",
          type: "font",
        },
      },
      utils: {
        utilsUrl: "https://warhol.io/components/utils",
        sources: [
          { type: "rule", selector: ".align-left", name: ".align-left", components: [] },
          { type: "rule", selector: ".align-right", name: "Right", components: [] },
          { type: "element", selector: ".shadow", name: ".shadow", components: [ ".foo", ".bar" ] },
        ],
      },
      components: [{
        name: ".foo",
        componentUrl: "https://warhol.io/components",
        target: ".foo",
        source: ".foo",
      }, {
        name: "Magic Slider",
        componentUrl: "https://google.de/",
        source: ".slider",
        target: ".bar",
      }],
    });
  });

  it("can process its own output", () => {
    const input = {
      patternLibUrl: "https://warhol.io/components",
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
        icons: {
          iconsUrl: "https://warhol.io/components/theme/icons",
          sources: ".icon",
          type: "font" as "font",
        },
      },
      utils: {
        utilsUrl: "https://warhol.io/components/utils",
        sources: [
          { type: "rule" as const, selector: ".align-left" },
          { type: "rule" as const, selector: ".align-right", name: "Right" },
          { type: "element" as const, selector: ".shadow", components: [ ".foo", ".bar" ] },
        ],
      },
      components: [
        { source: ".foo" },
        {
          name: "Magic Slider",
          componentUrl: "https://google.de/",
          source: ".slider",
          target: ".bar",
        },
      ],
    };
    const expected: Configuration = {
      patternLibUrl: "https://warhol.io/components",
      patternLibHeaders: {},
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
        icons: {
          iconsUrl: "https://warhol.io/components/theme/icons",
          sources: ".icon",
          type: "font",
        },
      },
      utils: {
        utilsUrl: "https://warhol.io/components/utils",
        sources: [
          { type: "rule", selector: ".align-left", name: ".align-left", components: [] },
          { type: "rule", selector: ".align-right", name: "Right", components: [] },
          { type: "element", selector: ".shadow", name: ".shadow", components: [ ".foo", ".bar" ] },
        ],
      },
      components: [{
        name: ".foo",
        componentUrl: "https://warhol.io/components",
        target: ".foo",
        source: ".foo",
      }, {
        name: "Magic Slider",
        componentUrl: "https://google.de/",
        source: ".slider",
        target: ".bar",
      }],
    };
    expect(fromObject(input)).toEqual(expected);
    expect(fromObject(fromObject(input))).toEqual(expected);
  });

});
