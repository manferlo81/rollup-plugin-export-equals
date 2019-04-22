import { ts, dts } from "rollup-plugin-dts";
import buble from "rollup-plugin-buble";
import cleanup from "./plugins/cleanup";
import equals from "./plugins/export-equals";

import { main, module as esModule, typings, dependencies, peerDependencies } from "./package.json";

const input = "src/index.ts";
const sourcemap = true;

const cjsOutput = {
  file: main,
  format: "cjs",
  sourcemap,
};

const esOutput = {
  file: esModule,
  format: "es",
  sourcemap,
};

const dtsOutput = {
  file: typings,
  format: "es",
};

const external = [...Object.keys(peerDependencies), ...Object.keys(dependencies)];

const jsConfig = {

  input,
  output: [cjsOutput, esOutput],

  external,

  plugins: [

    ts(),

    buble({
      target: {
        node: 0.12,
      },
    }),

  ],

};

const dtsConfig = {

  input,
  output: dtsOutput,

  external,

  plugins: [

    dts({
      banner: false,
    }),

    cleanup(),
    equals(),

  ],

};

export default [jsConfig, dtsConfig];
