import type { Plugin } from 'rollup';
import { createCodeTransformer, replaceFileContent } from './replace';
import type { ExportEqualsOptions } from './types';

export function equals(options: ExportEqualsOptions = {}): Plugin {

  const {
    file: filename,
    replace = 'export = $1',
  } = options;

  const name = 'export-equals';
  const transformCode = createCodeTransformer(replace);

  if (!filename) {
    return { name, renderChunk: transformCode };
  }

  const writeBundle = async () => {
    await replaceFileContent(filename, transformCode);
  };

  return { name, writeBundle };

}
