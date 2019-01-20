import { configFromFile } from "../src/index";


describe("configFromUrl()", () => {

  it("loads config data from a file", async () => {
    const actual = await configFromFile("./test/example.json");
    expect(typeof actual.styleguideUrl).toEqual("string");
    expect(actual.breakpoints).toEqual([ 800, 1000 ]);
    expect(actual.components).toEqual([
      { componentUrl: "https://google.de/", source: ".foo", target: ".foo" },
      { componentUrl: "https://google.de/", source: ".bar", target: ".bar" },
    ]);
    expect(actual.colorSources).toEqual([ ".swatch > .child", "#foo" ]);
    expect(actual.issues).toEqual([]);
  });

});
