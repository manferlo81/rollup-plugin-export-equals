import { PluginImpl } from "rollup";

type ReplaceFunction = (...args: any[]) => string;

interface ExportEqualsOptions {
  replace?: string | ReplaceFunction;
}

const equals: PluginImpl<ExportEqualsOptions> = (options: ExportEqualsOptions = {}) => {

  const {
    replace = "export = $1",
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
