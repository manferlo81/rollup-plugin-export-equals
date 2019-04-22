import { PluginImpl } from "rollup";

// tslint:disable-next-line: no-empty-interface
interface Op { }

const equals: PluginImpl<Op> = (options: Op = {}) => {

  const input = /export default ([\w_$]+[\d\w_$]*)/;
  const output = "export = $1";

  return {

    name: "export-equals",

    renderChunk(code) {
      return code.replace(input, output as any);
    },

  };

};

export default equals;
