import { configFromObject } from "../src/index";


describe("configFromUrl()", () => {

  it("interprets data from a plain js object", async () => {
    const input = {
      breakpoints: [800, 1000],
      styleguideUrl: "https://google.de/",
      colorSources: [ ".swatch > .child", "#foo" ],
      colorSourceProperties: [ "background-color" ],
      components: [{
        componentUrl: "https://google.de/",
        source: ".foo",
        target: ".foo",
      }, {
        componentUrl: "https://google.de/",
        source: ".bar",
        target: ".bar",
      }],
    };
    const actual = configFromObject(input);
    expect(typeof actual.styleguideUrl).toEqual("string");
    expect(actual.breakpoints).toEqual([ 800, 1000 ]);
    expect(actual.components).toEqual([
      { componentUrl: "https://google.de/", source: ".foo", target: ".foo" },
      { componentUrl: "https://google.de/", source: ".bar", target: ".bar" },
    ]);
    expect(actual.colorSources).toEqual([ ".swatch > .child", "#foo" ]);
    expect(actual.colorSourceProperties).toEqual([ "background-color" ]);
    expect(actual.issues).toEqual([]);
  });

});
