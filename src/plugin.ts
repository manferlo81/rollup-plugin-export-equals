import { readFile, writeFile } from 'fs/promises';
import type { Plugin } from 'rollup';
import type { ExportEqualsOptions, ReplaceFunction } from './types';

export function equals(options: ExportEqualsOptions = {}): Plugin {

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
        return code.replace(pattern, replace as string & ReplaceFunction);
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
