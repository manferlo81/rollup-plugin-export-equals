const generate = require("./generate");

const dts = require("rollup-plugin-dts").default;

test("should transform code", async () => {

  const code = await generate("example1.d.ts", [
    dts(),
  ]);

  expect(code).toMatch("export = test");

});

test("should skip if no match", async () => {

  const code = await generate("example2.d.ts", [
    dts(),
  ]);

  expect(code).not.toMatch("export = test");

});

test("should respect replace option", async () => {

  const code = await generate("example1.d.ts", [
    dts(),
  ], { replace: "module.exports = $1" });

  expect(code).toMatch("module.exports = test");

});
