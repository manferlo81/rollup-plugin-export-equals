import type { Plugin } from 'rollup'
import { rollup } from './rollup'

export async function generate(input: string, plugins: Plugin[]): Promise<string> {
  const build = await rollup(input, plugins)
  const { output: [{ code }] } = await build.generate({})
  return code
}
