import { resolve } from 'path';
import dts from 'rollup-plugin-dts';
import { equals } from '../src';
import { generate } from './tools/generate';
import { mockCWD } from './tools/mock-cwd';
import { readFile } from './tools/read-file';
import { rollup } from './tools/rollup';

test('should transform code', async () => {

  const code = await mockCWD(() => generate('default-export.d.ts', [
    dts(),
    equals(),
  ]));

  expect(code).toMatch('export = num');

});

test('should skip if no match', async () => {

  const code = await mockCWD(() => generate('named-export.d.ts', [
    dts(),
    equals(),
  ]));

  expect(code).not.toMatch('export = num');

});

test('should respect replace option', async () => {

  const code = await mockCWD(() => generate('default-export.d.ts', [
    dts(),
    equals({ replace: 'module.exports = $1' }),
  ]));

  expect(code).toMatch('module.exports = num');

});

test('should write using file mode', async () => {

  const content = await mockCWD(async () => {

    const file = resolve('output.d.ts');

    const build = await rollup('default-export.d.ts', [
      dts(),
      equals({ file }),
    ]);

    await build.write({
      file,
      format: 'es',
    });

    return await readFile(file, 'utf-8');

  });

  expect(content).toMatch('export = num');

});

test('should skip file if not in file mode', async () => {

  const content = await mockCWD(async () => {

    const file = resolve('output.d.ts');

    const build = await rollup('default-export.d.ts', [
      dts(),
      equals(),
    ]);

    await build.write({
      file,
      format: 'es',
    });

    return await readFile(file, 'utf-8');

  });

  expect(content).toMatch('export = num');

});
