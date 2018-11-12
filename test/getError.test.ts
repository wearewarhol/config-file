import { getError, ErrorType, ErrorLevel } from "../src/getError";
import { Configuration } from "../src/types";


describe("getError()", () => {

  it("returns error object configuration for a given error", () => {
    const error: Configuration = getError(
      null,
      ErrorType.CONFIG_PARSE_ERROR,
      ErrorLevel.ERROR,
      null,
    );

    expect(error.issues.length).toEqual(1);
  });

});
