import { parseConfigString } from "../src/index";
import { Configuration, Issue } from "../src/types";


describe("parseConfigString()", () => {


describe("valid configs", () => {

  it("parses a valid full config", () => {
    const config = {
      breakpoints: [ 800, 1000 ],
      components: [
        { source: ".foo", target: ".foo" },
        { source: ".bar", target: ".bar" },
      ],
    };
    const actual = parseConfigString(JSON.stringify(config));
    expect(actual.breakpoints).toEqual([ 800, 1000 ]);
    expect(actual.components).toEqual([
      { source: ".foo", target: ".foo" },
      { source: ".bar", target: ".bar" },
    ]);
    expect(actual.issues).toEqual([]);
  });

  it("parses a valid config without the optional breakpoints property", () => {
    const config = {
      components: [
        { source: ".foo", target: ".foo" },
        { source: ".bar", target: ".bar" },
      ],
    };
    const actual = parseConfigString(JSON.stringify(config));
    expect(actual.breakpoints).toEqual([ 1000 ]);
    expect(actual.components).toEqual([
      { source: ".foo", target: ".foo" },
      { source: ".bar", target: ".bar" },
    ]);
    expect(actual.issues).toEqual([]);
  });

});


describe("invalid configs", () => {

  const assertInvalid = (actual: Configuration, errorType: string): void => {
    expect(actual.breakpoints).toEqual([]);
    expect(actual.components).toEqual([]);
    expect(actual.issues.length).toBe(1);
    expect(actual.issues[0]).toEqual(
      jasmine.objectContaining<Issue<any>>({ type: errorType }),
    );
  };

  it("rejects an empty config", () => {
    assertInvalid(parseConfigString(``), "CONFIG_PARSE_ERROR");
    assertInvalid(parseConfigString(`null`), "CONFIG_PARSE_ERROR");
  });

  it("rejects malformed json", () => {
    assertInvalid(parseConfigString(`{ missingQuoutes: 42 }`), "CONFIG_PARSE_ERROR");
  });

  it("treats obvously invalid configurations as invalid input", () => {
    assertInvalid(parseConfigString(`[]`), "CONFIG_VALIDATION_ERROR");
    assertInvalid(parseConfigString(`{}`), "CONFIG_VALIDATION_ERROR");
    assertInvalid(parseConfigString(`{ "answer": 42 }`), "CONFIG_VALIDATION_ERROR");
  });

});


});
