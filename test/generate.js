const { rollup } = require("rollup");
const path = require("path");

const { dts } = require("rollup-plugin-dts");
const equals = require("..");

async function generate() {
  const build = await rollup({
    input: path.resolve(__dirname, "example.ts"),
    plugins: [
      dts(),
      equals(),
    ],
  });
  const { output: [{ code }] } = await build.generate({
    file: "output.d.ts",
    format: "es",
  });
  return code;
}

module.exports = generate;
