const { rollup } = require("rollup");
const path = require("path");

const { dts } = require("rollup-plugin-dts");
const equals = require("..");

async function generate(filename, options) {

  const build = await rollup({
    input: path.resolve(__dirname, filename),
    plugins: [
      dts(),
      equals(options),
    ],
  });

  const { output: [{ code }] } = await build.generate({ file: "output.d.ts" });

  return code;

}

module.exports = generate;
