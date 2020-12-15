import type { Plugin, RollupBuild } from 'rollup';
import { rollup as rollupBuild } from 'rollup';

export function rollup(input: string, plugins: Plugin[]): Promise<RollupBuild> {
  return rollupBuild({
    input,
    plugins,
  });
}
