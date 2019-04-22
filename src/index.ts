import { PluginImpl } from "rollup";

interface Op {
  replace?: string | ((...args: any[]) => string);
}

const equals: PluginImpl<Op> = (options: Op = {}) => {

  const {
    replace = "export = $1"
  } = options;

  const reg = /export default ([\w_$]+[\d\w_$]*)/;

  return {

    name: "export-equals",

    renderChunk(code) {
      if (!reg.test(code)) {
        return null;
      }
      return code.replace(reg, replace as any);
    },

  };

};

export default equals;
