import * as nock from "nock";
import { configFromUrl } from "../src/index";


nock("http://example.com")
  .get("/validConfig.json")
  .reply(200, {
    breakpoints: [ 800, 1000 ],
    components: [
      { sourceSelector: ".foo", targetSelector: ".foo" },
      { sourceSelector: ".bar", targetSelector: ".bar" },
    ],
  });


describe("configFromUrl()", () => {

  it("loads config data from a url", async () => {
    const actual = await configFromUrl("http://example.com/validConfig.json");
    expect(actual.breakpoints).toEqual([ 800, 1000 ]);
    expect(actual.components).toEqual([
      [ ".foo", ".foo" ],
      [ ".bar", ".bar" ],
    ]);
    expect(actual.issues).toEqual([]);
  });

});

