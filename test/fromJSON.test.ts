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
        componentUrl: null,
        target: "#hello",
        source: ".foo",
      }, {
        name: null,
        componentUrl: null,
        target: ".bar",
        source: ".bar",
      }],
    });
  });

  it("throws syntax errors for invalid input", () => {
    expect( () => fromJSON(`{{}`) ).toThrow(jasmine.objectContaining({
      name: "SyntaxError",
    }));
  });

});
