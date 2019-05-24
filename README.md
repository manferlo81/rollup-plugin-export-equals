# rollup-plugin-export-equals

[![CircleCI](https://circleci.com/gh/manferlo81/rollup-plugin-export-equals.svg?style=svg)](https://circleci.com/gh/manferlo81/rollup-plugin-export-equals) [![Greenkeeper badge](https://badges.greenkeeper.io/manferlo81/rollup-plugin-export-equals.svg)](https://greenkeeper.io/) [![npm](https://img.shields.io/npm/v/rollup-plugin-export-equals.svg)](https://www.npmjs.com/package/rollup-plugin-export-equals) [![David](https://img.shields.io/david/manferlo81/rollup-plugin-export-equals.svg)](https://david-dm.org/manferlo81/rollup-plugin-export-equals) [![David](https://img.shields.io/david/dev/manferlo81/rollup-plugin-export-equals.svg)](https://david-dm.org/manferlo81/rollup-plugin-export-equals?type=dev) [![David](https://img.shields.io/david/peer/manferlo81/rollup-plugin-export-equals.svg)](https://david-dm.org/manferlo81/rollup-plugin-export-equals?type=peer) [![install size](https://packagephobia.now.sh/badge?p=rollup-plugin-export-equals)](https://packagephobia.now.sh/result?p=rollup-plugin-export-equals) [![npm bundle size](https://img.shields.io/bundlephobia/min/rollup-plugin-export-equals.svg)](https://bundlephobia.com/result?p=rollup-plugin-export-equals) [![codecov](https://codecov.io/gh/manferlo81/rollup-plugin-export-equals/branch/master/graph/badge.svg)](https://codecov.io/gh/manferlo81/rollup-plugin-export-equals) [![GitHub](https://img.shields.io/github/license/manferlo81/rollup-plugin-export-equals.svg)](https://github.com/manferlo81/rollup-plugin-export-equals/blob/master/LICENSE)

Transforms `export default something` to `export = something` for CommonJS module export

> *for most applications you won't need this plugin, but it is specially useful after* [`rollup-plugin-dts`](https://github.com/Swatinem/rollup-plugin-dts) *if your want to build a CommonJS module.*

## Install

```sh
npm install --save-dev rollup-plugin-export-equals
```

## Usage

```javascript
// rollup.config.js
import { dts } from "rollup-plugin-dts";
import equals from "rollup-plugin-export-equals";

export default {

  input: "src/index.ts",
  output: { file: "index.d.ts", format: "es" },

  plugins: [
    dts(),
    equals(),
  ]

}
```

## Options

#### replace

`replace: string`
`replace: (...args: any[]) => string`
`default value: "export = $1"`

*string or function to be passed to* `code.replace` *function.* `$1` *refers to the original value captured from* `export default ...`

## License

[MIT](LICENSE) &copy; Manuel Fernández
