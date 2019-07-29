import { fromJSON } from "../src/index";

describe("fromJSON()", () => {

  it("parses a valid full config", () => {
    const input = `{
      "patternLibUrl": "https://example.com/components",
      "breakpoints": [ 800, 1000 ],
      "components": [
        { "source": ".foo", "target": "#hello" },
        { "source": ".bar" }
      ],
      "theme": {
        "colors": {
          "sources": ".swatch",
          "properties": [ "background-color", "color" ]
        },
        "typography": {
          "sources": ".typo",
          "properties": [ "font-family", "font-size", "font-style", "font-weight", "color" ]
        },
        "icons": {
          "sources": ".icon",
          "isFont": true
        }
      }
    }`;
    expect(fromJSON(input)).toEqual({
      patternLibUrl: "https://example.com/components",
      theme: {
        themeUrl: "https://example.com/components",
        colors: {
          colorsUrl: "https://example.com/components",
          sources: ".swatch",
          properties: [ "background-color", "color" ],
        },
        typography: {
          typographyUrl: "https://example.com/components",
          sources: ".typo",
          properties: [ "font-family", "font-size", "font-style", "font-weight", "color" ],
        },
        icons: {
          iconsUrl: "https://example.com/components",
          sources: ".icon",
          isFont: true,
        },
      },
      breakpoints: [ 800, 1000 ],
      components: [{
        name: null,
        componentUrl: "https://example.com/components",
        target: "#hello",
        source: ".foo",
      }, {
        name: null,
        componentUrl: "https://example.com/components",
        target: ".bar",
        source: ".bar",
      }],
    });
  });

  it("expodes on empty input syntax errors for invalid input", () => {
    expect( () => fromJSON(null as any) ).toThrow(jasmine.objectContaining({
      name: "InvalidConfigError",
      message: "Input must be a JSON-encoded string, got null",
    }));
    expect( () => fromJSON(undefined as any) ).toThrow(jasmine.objectContaining({
      name: "InvalidConfigError",
      message: "Input must be a JSON-encoded string, got undefined",
    }));
    expect( () => fromJSON(``) ).toThrow(jasmine.objectContaining({
      name: "InvalidConfigError",
      message: "Input string is empty",
    }));
    expect( () => fromJSON(`  `) ).toThrow(jasmine.objectContaining({
      name: "InvalidConfigError",
      message: "Input string is empty",
    }));
  });

  it("throws syntax errors for invalid input", () => {
    expect( () => fromJSON(`{{}`) ).toThrow(jasmine.objectContaining({ name: "SyntaxError" }));
  });

});
