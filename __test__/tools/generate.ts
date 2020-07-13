import type { Plugin } from 'rollup';
import equals from '../../src';
import rollup from './rollup';

async function generate(filename: string, plugins: Plugin[], options?: equals.ExportEqualsOptions): Promise<string> {
  const build = await rollup(filename, plugins, options);
  const { output: [{ code }] } = await build.generate({ file: 'output.d.ts' });
  return code;
}

export default generate;
