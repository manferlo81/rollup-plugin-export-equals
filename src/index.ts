import { readFile, writeFile } from 'fs/promises';
import type { Plugin } from 'rollup';

function equals(options: equals.ExportEqualsOptions = {}): Plugin {

  const {
    file: filename,
    replace = 'export = $1',
  } = options;

  const captureIdPattern = '([a-zA-Z$_][\\w$_]*)';

  const strings = [
    `export default ${captureIdPattern}`,
    `export { ${captureIdPattern} as default }`,
  ];

  const patterns = strings.map((str) => new RegExp(str));

  const replaceExport = (code: string): string => {
    for (const pattern of patterns) {
      if (pattern.test(code)) {
        return code.replace(pattern, replace as string & equals.ReplaceFunction);
      }
    }
    return code;
  };

  return {

    name: 'export-equals',

    renderChunk(code) {

      if (filename) {
        return;
      }

      return replaceExport(code);

    },

    async writeBundle() {

      if (!filename) {
        return;
      }

      const content = await readFile(
        filename,
        'utf-8',
      );

      await writeFile(
        filename,
        replaceExport(content),
      );

    },

  };

}

// eslint-disable-next-line @typescript-eslint/no-namespace
namespace equals {

  export type ReplaceFunction = (match: string, ...args: string[]) => string;

  export interface ExportEqualsOptions {
    file?: string;
    replace?: ReplaceFunction | string;
  }

}

export default equals;
