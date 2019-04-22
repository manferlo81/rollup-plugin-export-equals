const generate = require("./generate");

test("should transform code", async () => {

  const code = await generate();

  expect(code).toMatch("export = ");

});
