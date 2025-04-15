import { readFile, writeFile } from 'node:fs/promises'
import type { ReplaceFunction } from './types'

/** Matches a space */
const space = '\\s'

/** Matches any number of spaces */
const optionalSpace = `${space}*`

/** Matches one or more spaces */
const requiredSpace = `${space}+`

/** Matches and captures a valid javascript id */
const captureIdPattern = '([a-zA-Z$_][\\w$_]*)'

const patternStrings = [
  `export${requiredSpace}default${requiredSpace}${captureIdPattern}`,
  `export${optionalSpace}{${optionalSpace}${captureIdPattern}${requiredSpace}as${requiredSpace}default${optionalSpace}}`,
]

const createRegExpFromString = (str: string): RegExp => new RegExp(str)
const patterns = patternStrings.map(createRegExpFromString)

type TransformCodeFunction = (code: string) => string | undefined

export function createCodeTransformer(replacer: ReplaceFunction | string): TransformCodeFunction {
  return (code) => {
    for (const pattern of patterns) {
      if (pattern.test(code)) return code.replace(pattern, replacer as never)
    }
  }
}

export async function replaceFileContent(filename: string, transform: TransformCodeFunction) {

  const content = await readFile(
    filename,
    'utf-8',
  )

  const modifiedCode = transform(content)

  if (!modifiedCode) return

  await writeFile(
    filename,
    modifiedCode,
  )

}
