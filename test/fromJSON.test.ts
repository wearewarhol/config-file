import { fromJSON } from "../src/index";

describe("fromJSON()", () => {

  it("parses a valid full config", () => {
    const input = `{
      "styleguideUrl": "https://example.com/components",
      "breakpoints": [ 800, 1000 ],
      "components": [
        { "source": ".foo", "target": "#hello" },
        { "source": ".bar" }
      ],
      "theme": {
        "colors": {
          "sources": ".swatch",
          "properties": [ "background-color", "color" ]
        }
      }
    }`;
    expect(fromJSON(input)).toEqual({
      styleguideUrl: "https://example.com/components",
      theme: {
        themeUrl: "https://example.com/components",
        colors: {
          colorsUrl: "https://example.com/components",
          sources: ".swatch",
          properties: [ "background-color", "color" ],
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
