import dts from 'rollup-plugin-dts';
import generate from './tools/generate';
import { readFile } from './tools/read-file';
import { resolveTemp } from './tools/resolve-temp';
import rollup from './tools/rollup';

test('should transform code', async () => {

  const code = await generate('default-export.d.ts', [
    dts(),
  ]);

  expect(code).toMatch('export = test');

});

test('should skip if no match', async () => {

  const code = await generate('named-export.d.ts', [
    dts(),
  ]);

  expect(code).not.toMatch('export = test');

});

test('should respect replace option', async () => {

  const code = await generate('default-export.d.ts', [
    dts(),
  ], { replace: 'module.exports = $1' });

  expect(code).toMatch('module.exports = test');

});

test('should write using file mode', async () => {

  const file = resolveTemp('output1.d.ts');

  const build = await rollup('default-export.d.ts', [
    dts(),
  ], { file });

  await build.write({
    file,
    format: 'es',
  });

  const content = await readFile(file, 'utf-8');
  expect(content).toMatch('export = test');

});

test('should skip file if not in file mode', async () => {

  const file = resolveTemp('output2.d.ts');

  const build = await rollup('default-export.d.ts', [
    dts(),
  ]);

  await build.write({
    file,
    format: 'es',
  });

  const content = await readFile(file, 'utf-8');
  expect(content).toMatch('export = test');

});
