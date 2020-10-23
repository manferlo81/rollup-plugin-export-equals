import { readFile as fsReadFile, writeFile as fsWriteFile } from 'fs';
import type { Plugin } from 'rollup';
import { promisify } from 'util';

const readFile: (filename: string) => Promise<Buffer> = promisify(fsReadFile);
const writeFile: (filename: string, data: string) => Promise<void> = promisify<string, string>(fsWriteFile);

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

      const content = await readFile(filename);

      await writeFile(
        filename,
        replaceExport(content.toString()),
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
