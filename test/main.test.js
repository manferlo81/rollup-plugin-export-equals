const generate = require("./generate");

test("should transform code", async () => {

  const code = await generate("example1.ts");

  expect(code).toMatch("export = ");

});

test("should skip if no match", async () => {

  const code = await generate("example2.ts");

  expect(code).not.toMatch("export = ");

});

test("should respect replace option", async () => {

  const code = await generate("example1.ts", {
    replace: "module.exports = $1",
  });

  expect(code).toMatch("module.exports = ");

});
