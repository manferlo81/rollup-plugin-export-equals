const { rollup } = require("rollup");
const path = require("path");

const equals = require("..");

async function generate(filename, plugins, options) {

  const build = await rollup({
    input: path.resolve(__dirname, filename),
    plugins: [
      ...plugins,
      equals(options),
    ],
  });

  const { output: [{ code }] } = await build.generate({ file: "output.d.ts" });

  return code;

}

module.exports = generate;
