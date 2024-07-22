# rollup-plugin-export-equals

[![CircleCI](https://circleci.com/gh/manferlo81/rollup-plugin-export-equals.svg?style=svg)](https://circleci.com/gh/manferlo81/rollup-plugin-export-equals)
[![npm](https://badgen.net/npm/v/rollup-plugin-export-equals)](https://www.npmjs.com/package/rollup-plugin-export-equals)
[![codecov](https://codecov.io/gh/manferlo81/rollup-plugin-export-equals/branch/master/graph/badge.svg)](https://codecov.io/gh/manferlo81/rollup-plugin-export-equals)
[![packagephobia](https://badgen.net/packagephobia/install/rollup-plugin-export-equals)](https://packagephobia.now.sh/result?p=rollup-plugin-export-equals)
[![bundlephobia](https://badgen.net/bundlephobia/min/rollup-plugin-export-equals)](https://bundlephobia.com/result?p=rollup-plugin-export-equals)
[![types](https://img.shields.io/npm/types/rollup-plugin-export-equals.svg)](https://github.com/microsoft/typescript)
[![Known Vulnerabilities](https://snyk.io/test/github/manferlo81/rollup-plugin-export-equals/badge.svg?targetFile=package.json)](https://snyk.io/test/github/manferlo81/rollup-plugin-export-equals?targetFile=package.json)
[![license](https://badgen.net/github/license/manferlo81/rollup-plugin-export-equals)](LICENSE)

Transforms `export default x` or `export { x as default }` to `export = x` for CommonJS module type declaration export.

> *For most applications you won't need this plugin, but it is specially useful after* [`rollup-plugin-dts`](https://github.com/Swatinem/rollup-plugin-dts) or [`rolloup-plugin-typescript2`](https://github.com/ezolenko/rollup-plugin-typescript2) *(maybe others...) if you want to build a CommonJS module.*

## Install

```bash
npm i -D rollup-plugin-export-equals
```

## Usage

### with `rollup-plugin-dts@1.x.x`

```javascript
// rollup.config.js

import dts from 'rollup-plugin-dts';
import equals from 'rollup-plugin-export-equals';

export default {

  input: 'input/index.d.ts',
  output: { file: 'out/index.d.ts', format: 'cjs' },

  plugins: [
    dts(),
    equals(),
  ],

};
```

### with `rollup-plugin-typescript2`

```javascript
// rollup.config.js

import ts from 'rollup-plugin-typescript2';
import equals from 'rollup-plugin-export-equals';

export default {

  input: 'src/index.ts',
  output: { file: 'dist/index.js', format: 'cjs' },

  plugins: [
    ts(),
    equals({
      file: 'path/to/index.d.ts'
    }),
  ],

};
```

## Options

### file

```typescript
file: string;
```

Path to the file which content to be replaced. If provided the plugin will transform the file in-place instead of the bundled output. It will process the file after it has been written to disk. For example after `rollup-plugin-typescript2` has written it to disk.

### replace

```typescript
replace: string;
replace: (match: string, captured: string) => string;
default: 'export = $1'
```

String or function to be passed to `code.replace` function. `$1` refers to the original value captured from `export default ...`.

## License

[MIT](LICENSE) &copy; 2019-2024 [Manuel Fernández](https://github.com/manferlo81)
