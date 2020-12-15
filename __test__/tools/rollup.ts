import type { Plugin } from 'rollup';
import { rollup as rollupBuild } from 'rollup';
import equals from '../../src';
import { resolveExample } from './resolve-example';

function rollup(filename: string, plugins: Plugin[], options?: equals.ExportEqualsOptions): ReturnType<typeof rollupBuild> {
  return rollupBuild({
    input: resolveExample(filename),
    plugins: [
      ...plugins,
      equals(options),
    ],
  });
}

export default rollup;
