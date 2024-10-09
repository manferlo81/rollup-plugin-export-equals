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

  // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
  const replaceExport = (code: string): string | void => {
    for (const pattern of patterns) {
      if (pattern.test(code)) {
        return code.replace(pattern, replace as string & ReplaceFunction);
      }
    }
  };

  const name = 'export-equals';

  if (!filename) {
    return { name, renderChunk: replaceExport };
  }

  const writeBundle = async () => {

    const content = await readFile(
      filename,
      'utf-8',
    );

    const modifiedCode = replaceExport(content);

    if (!modifiedCode) return;

    await writeFile(
      filename,
      modifiedCode,
    );

  };

  return { name, writeBundle };

}
