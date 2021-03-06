import { fromJSON, Configuration } from "../src/index";

describe("fromJSON()", () => {
  it("parses a valid full config", () => {
    const input = `{
      "patternLibUrl": "https://example.com/components",
      "patternLibHeaders": {
        "DNT": "1"
      },
      "patternLibCookies": [{
        "name": "Hello",
        "value": "42",
        "domain": "example.com",
        "expires": 9000,
        "sameSite": "Lax"
      }],
      "breakpoints": [ 800, 1000 ],
      "components": [
        { "source": ".foo", "target": "#hello", "name": "MyFoo" },
        { "source": ".bar" }
      ],
      "utils": {
        "sources": [
          { "type": "rule", "selector": ".align-left" },
          { "type": "rule", "selector": ".align-right", "name": "Right", "components": [ ".bar" ] },
          { "type": "element", "selector": ".shadow" }
        ]
      },
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
          "type": "font"
        }
      }
    }`;
    expect(fromJSON(input)).toEqual({
      patternLibUrl: "https://example.com/components",
      patternLibHeaders: {
        DNT: "1",
      },
      patternLibCookies: [
        {
          name: "Hello",
          value: "42",
          expires: 9000,
          domain: "example.com",
          sameSite: "Lax",
        },
      ],
      theme: {
        themeUrl: "https://example.com/components",
        colors: {
          colorsUrl: "https://example.com/components",
          sources: ".swatch",
          properties: ["background-color", "color"],
        },
        typography: {
          typographyUrl: "https://example.com/components",
          sources: ".typo",
          properties: [
            "font-family",
            "font-size",
            "font-style",
            "font-weight",
            "color",
          ],
        },
        icons: {
          iconsUrl: "https://example.com/components",
          sources: ".icon",
          type: "font",
        },
      },
      utils: {
        utilsUrl: "https://example.com/components",
        sources: [
          {
            type: "rule",
            selector: ".align-left",
            name: ".align-left",
            components: [],
          },
          {
            type: "rule",
            selector: ".align-right",
            name: "Right",
            components: [".bar"],
          },
          {
            type: "element",
            selector: ".shadow",
            name: ".shadow",
            components: [],
          },
        ],
      },
      breakpoints: [800, 1000],
      components: [
        {
          name: "MyFoo",
          componentUrl: "https://example.com/components",
          target: "#hello",
          source: ".foo",
        },
        {
          name: ".bar",
          componentUrl: "https://example.com/components",
          target: ".bar",
          source: ".bar",
        },
      ],
    });
  });

  it("can parse its own output", () => {
    const input = `{
      "patternLibUrl": "https://example.com/components",
      "patternLibHeaders": {
        "DNT": "1"
      },
      "patternLibCookies": [{
        "name": "Hello",
        "value": "42",
        "expires": 9000,
        "domain": "example.com",
        "sameSite": "Lax"
      }],
      "breakpoints": [ 800, 1000 ],
      "components": [
        { "source": ".foo", "target": "#hello", "name": "MyFoo" },
        { "source": ".bar" }
      ],
      "utils": {
        "sources": [
          { "type": "rule", "selector": ".align-left" },
          { "type": "rule", "selector": ".align-right", "name": "Right", "components": [ ".bar" ] },
          { "type": "element", "selector": ".shadow" }
        ]
      },
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
          "type": "font"
        }
      }
    }`;
    const expected: Configuration = {
      patternLibUrl: "https://example.com/components",
      patternLibHeaders: {
        DNT: "1",
      },
      patternLibCookies: [
        {
          name: "Hello",
          value: "42",
          expires: 9000,
          domain: "example.com",
          sameSite: "Lax",
        },
      ],
      theme: {
        themeUrl: "https://example.com/components",
        colors: {
          colorsUrl: "https://example.com/components",
          sources: ".swatch",
          properties: ["background-color", "color"],
        },
        typography: {
          typographyUrl: "https://example.com/components",
          sources: ".typo",
          properties: [
            "font-family",
            "font-size",
            "font-style",
            "font-weight",
            "color",
          ],
        },
        icons: {
          iconsUrl: "https://example.com/components",
          sources: ".icon",
          type: "font",
        },
      },
      utils: {
        utilsUrl: "https://example.com/components",
        sources: [
          {
            type: "rule",
            selector: ".align-left",
            name: ".align-left",
            components: [],
          },
          {
            type: "rule",
            selector: ".align-right",
            name: "Right",
            components: [".bar"],
          },
          {
            type: "element",
            selector: ".shadow",
            name: ".shadow",
            components: [],
          },
        ],
      },
      breakpoints: [800, 1000],
      components: [
        {
          name: "MyFoo",
          componentUrl: "https://example.com/components",
          target: "#hello",
          source: ".foo",
        },
        {
          name: ".bar",
          componentUrl: "https://example.com/components",
          target: ".bar",
          source: ".bar",
        },
      ],
    };
    expect(fromJSON(input)).toEqual(expected);
    expect(fromJSON(JSON.stringify(fromJSON(input)))).toEqual(expected);
  });

  it("expodes on empty input syntax errors for invalid input", () => {
    expect(() => fromJSON(null as any)).toThrow(
      jasmine.objectContaining({
        name: "MalformedConfigError",
        message: "Input must be a JSON-encoded string, got null",
      })
    );
    expect(() => fromJSON(undefined as any)).toThrow(
      jasmine.objectContaining({
        name: "MalformedConfigError",
        message: "Input must be a JSON-encoded string, got undefined",
      })
    );
    expect(() => fromJSON(``)).toThrow(
      jasmine.objectContaining({
        name: "MalformedConfigError",
        message: "Input string is empty",
      })
    );
    expect(() => fromJSON(`  `)).toThrow(
      jasmine.objectContaining({
        name: "MalformedConfigError",
        message: "Input string is empty",
      })
    );
  });

  it("throws syntax errors for invalid input", () => {
    expect(() => fromJSON(`{{}`)).toThrow(
      jasmine.objectContaining({ name: "MalformedConfigError" })
    );
  });
});
