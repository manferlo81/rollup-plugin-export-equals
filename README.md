# rollup-plugin-export-equals

[![CircleCI](https://circleci.com/gh/manferlo81/rollup-plugin-export-equals.svg?style=svg)](https://circleci.com/gh/manferlo81/rollup-plugin-export-equals) [![Greenkeeper badge](https://badges.greenkeeper.io/manferlo81/rollup-plugin-export-equals.svg)](https://greenkeeper.io/) [![npm](https://img.shields.io/npm/v/rollup-plugin-export-equals.svg)](https://www.npmjs.com/package/rollup-plugin-export-equals) [![David](https://img.shields.io/david/manferlo81/rollup-plugin-export-equals.svg)](https://david-dm.org/manferlo81/rollup-plugin-export-equals) [![David](https://img.shields.io/david/dev/manferlo81/rollup-plugin-export-equals.svg)](https://david-dm.org/manferlo81/rollup-plugin-export-equals?type=dev) [![David](https://img.shields.io/david/peer/manferlo81/rollup-plugin-export-equals.svg)](https://david-dm.org/manferlo81/rollup-plugin-export-equals?type=peer) [![install size](https://packagephobia.now.sh/badge?p=rollup-plugin-export-equals)](https://packagephobia.now.sh/result?p=rollup-plugin-export-equals) [![npm bundle size](https://img.shields.io/bundlephobia/min/rollup-plugin-export-equals.svg)](https://bundlephobia.com/result?p=rollup-plugin-export-equals) [![codecov](https://codecov.io/gh/manferlo81/rollup-plugin-export-equals/branch/master/graph/badge.svg)](https://codecov.io/gh/manferlo81/rollup-plugin-export-equals) [![Known Vulnerabilities](https://snyk.io/test/github/manferlo81/rollup-plugin-export-equals/badge.svg?targetFile=package.json)](https://snyk.io/test/github/manferlo81/rollup-plugin-export-equals?targetFile=package.json) [![GitHub](https://img.shields.io/github/license/manferlo81/rollup-plugin-export-equals.svg)](https://github.com/manferlo81/rollup-plugin-export-equals/blob/master/LICENSE)

Transforms `export default something` to `export = something` for CommonJS module type declaration export.

> *For most applications you won't need this plugin, but it is specially useful after* [`rollup-plugin-dts`](https://github.com/Swatinem/rollup-plugin-dts) or [`rolloup-plugin-typescript2`](https://github.com/ezolenko/rollup-plugin-typescript2) *(maybe others...) if your want to build a CommonJS module.*

## Install

```bash
npm i -D rollup-plugin-export-equals
```

## Usage

#### with `rollup-plugin-dts@0.x.x`

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

#### with `rollup-plugin-dts@1.x.x`

```javascript
// rollup.config.js
import dts from "rollup-plugin-dts";
import equals from "rollup-plugin-export-equals";

export default {

  input: "input/index.d.ts",
  output: { file: "out/index.d.ts", format: "es" },

  plugins: [
    dts(),
    equals(),
  ]

}
```

#### with `rollup-plugin-typescript2`

```javascript
// rollup.config.js
import ts from "rollup-plugin-typescript2";
import equals from "rollup-plugin-export-equals";

export default {

  input: "src/index.ts",
  output: { file: "dist/index.js", format: "cjs" },

  plugins: [
    ts({
      // ... rollup-plugin-typescript2 options
    }),
    equals({
      file: "index.d.ts"
    }),
  ]

}
```

## Options

### file

```typescript
file: string;
```

*Path to the file which content to be replaced. If provided the plugin will transform the file in-place instead of the bundled output. It will process the file after it has been writen to disk. For example after* `rollup-plugin-typescript2` *has written it to disk.* 

### replace

```typescript
replace: string;
replace: (...args: any[]) => string;
default: "export = $1"
```

*String or function to be passed to* `code.replace` *function.* `$1` *refers to the original value captured from* `export default ...`*.*

## License

[MIT](LICENSE) &copy; [Manuel Fernández](https://github.com/manferlo81)
