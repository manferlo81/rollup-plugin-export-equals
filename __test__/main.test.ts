import { readFileSync } from 'fs'
import { resolve } from 'path'
import dts from 'rollup-plugin-dts'
import generate from './tools/generate'
import rollup from './tools/rollup'

const tempFolder = resolve(process.cwd(), 'node_modules/.cache/.temp')

test('should transform code', async () => {

  const code = await generate('example1.d.ts', [
    dts(),
  ])

  expect(code).toMatch('export = test')

})

test('should skip if no match', async () => {

  const code = await generate('example2.d.ts', [
    dts(),
  ])

  expect(code).not.toMatch('export = test')

})

test('should respect replace option', async () => {

  const code = await generate('example1.d.ts', [
    dts(),
  ], { replace: 'module.exports = $1' })

  expect(code).toMatch('module.exports = test')

})

test('should write using file mode', async () => {

  const file = resolve(tempFolder, 'output1.d.ts')

  const build = await rollup('example1.d.ts', [
    dts(),
  ], { file })

  await build.write({
    file,
    format: 'es',
  })

  const content = readFileSync(file).toString()

  expect(content).toMatch('export = test')

})

test('should skip file if not in file mode', async () => {

  const file = resolve(tempFolder, 'output2.d.ts')

  const build = await rollup('example1.d.ts', [
    dts(),
  ])

  await build.write({
    file,
    format: 'es',
  })

  const content = readFileSync(file).toString()

  expect(content).toMatch('export = test')

})
