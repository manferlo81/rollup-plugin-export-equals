import { Plugin } from 'rollup';
import equals from '../../src';
import rollup from './rollup';

type ExportEqualsOptions = (typeof equals) extends ((options: infer O) => any) ? O : never;

async function generate(filename: string, plugins: Plugin[], options?: ExportEqualsOptions) {
  const build = await rollup(filename, plugins, options);
  const { output: [{ code }] } = await build.generate({ file: 'output.d.ts' });
  return code;
}

export default generate;
