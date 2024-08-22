export type ReplaceFunction = (match: string, ...args: string[]) => string;

export interface ExportEqualsOptions {
  file?: string;
  replace?: ReplaceFunction | string;
}
