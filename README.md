# rollup-plugin-export-equals

[![Greenkeeper badge](https://badges.greenkeeper.io/manferlo81/rollup-plugin-export-equals.svg)](https://greenkeeper.io/)

Transforms `export default something` to `export = something` for CommonJS module export

> *for most applications you won't need this plugin, but it is specially useful after* [`rollup-plugin-dts`](https://github.com/Swatinem/rollup-plugin-dts) *if your want to build a CommonJS module.*

# Install

```sh
npm install --save-dev rollup-plugin-export-equals
```

# Usage

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

# License

MIT License
