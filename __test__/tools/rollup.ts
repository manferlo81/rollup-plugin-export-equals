import path from 'path';
import { rollup as rollupBuild } from 'rollup';
import type { Plugin } from 'rollup';
import equals from '../../src';

function rollup(filename: string, plugins: Plugin[], options?: equals.ExportEqualsOptions): ReturnType<typeof rollupBuild> {
  return rollupBuild({
    input: path.resolve(__dirname, '../examples', filename),
    plugins: [
      ...plugins,
      equals(options),
    ],
  });
}

export default rollup;
