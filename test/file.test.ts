import { configFromFile } from "../src/index";


describe("configFromUrl()", () => {

  it("loads config data from a file", async () => {
    const actual = await configFromFile("./test/example.json");
    expect(typeof actual.styleguideUrl).toEqual("string");
    expect(actual.breakpoints).toEqual([ 800, 1000 ]);
    expect(actual.components).toEqual([
      [ ".foo", ".foo" ],
      [ ".bar", ".bar" ],
    ]);
    expect(actual.issues).toEqual([]);
  });

});
