import { resolve } from 'path';

export function resolveExample(filename: string): string {
  return resolve(__dirname, '../examples', filename);
}
