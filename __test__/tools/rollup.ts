import path from 'path';
import { Plugin, rollup as rollupBuild } from 'rollup';
import equals from '../../src';

type ExportEqualsOptions = (typeof equals) extends ((options: infer O) => any) ? O : never;

function rollup(filename: string, plugins: Plugin[], options?: ExportEqualsOptions) {
  return rollupBuild({
    input: path.resolve(__dirname, '../examples', filename),
    plugins: [
      ...plugins,
      equals(options),
    ],
  });
}

export default rollup;
