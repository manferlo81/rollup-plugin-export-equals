import { readFile, writeFile } from "fs";
import { PluginImpl } from "rollup";
import { promisify } from "util";

const read = promisify(readFile);
const write = promisify(writeFile);

type ReplaceFunction = (...args: any[]) => string;

interface ExportEqualsOptions {
  file?: string;
  replace?: string | ReplaceFunction;
}

const equals: PluginImpl<ExportEqualsOptions> = (options: ExportEqualsOptions = {}) => {

  const {
    file: filename,
    replace = "export = $1",
  } = options;

  const reg = /export default ([\w_$]+[\d\w_$]*)/;

  const replaceExport = (code: string) => code.replace(reg, replace as any);

  return {

    name: "export-equals",

    renderChunk(code) {

      if (filename || !reg.test(code)) {
        return null;
      }

      return replaceExport(code);

    },

    async writeBundle() {

      if (!filename) {
        return;
      }

      const content = await read(filename);
      await write(
        filename,
        replaceExport(content.toString()),
      );

    },

  };

};

export default equals;
