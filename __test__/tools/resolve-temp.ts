import { resolve } from 'path';

export function resolveTemp(filename: string): string {
  return resolve(__dirname, '../../node_modules/.cache/.temp', filename);
}
