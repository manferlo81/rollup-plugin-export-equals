export function createFileContent(...lines: string[]): string {
  return lines.map((line) => `${line}\n`).join('')
}
