import { readFile as fsReadFile, writeFile as fsWriteFile } from 'fs';
import type { Plugin } from 'rollup';
import { promisify } from 'util';

const readFile = promisify<(path: string, encoding: 'utf-8') => Promise<string>>(fsReadFile);
const writeFile = promisify<(path: string, data: string) => Promise<void>>(fsWriteFile);

function equals(options: equals.ExportEqualsOptions = {}): Plugin {

  const {
    file: filename,
    replace = 'export = $1',
  } = options;

  const reg = /export default (.*)/;

  const replaceExport = (code: string) => code.replace(reg, replace as never);

  return {

    name: 'export-equals',

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
