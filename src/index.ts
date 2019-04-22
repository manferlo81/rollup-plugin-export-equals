import { PluginImpl } from "rollup";

interface Op {
  replace?: string;
}

const equals: PluginImpl<Op> = (options: Op = {}) => {

  const {
    replace = "export = $1"
  } = options;

  const reg = /export default ([\w_$]+[\d\w_$]*)/;

  return {

    name: "export-equals",

    renderChunk(code) {
      return code.replace(reg, replace);
    },

  };

};

export default equals;
