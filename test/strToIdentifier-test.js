const assert = require("assert");

describe("strToIdentifier", () => {
  describe("#main", () => {
    it("should convert str to Identifier", () => {
      const strToIdentifier = require("../src/app/util/strToIdentifier.ts");
      let str = strToIdentifier("hello world");
      assert.equal(str, "hello_world");
    });
  });
});
