import { readFile as fsReadFile } from 'fs';
import { promisify } from 'util';

export const readFile = promisify<(path: string, enconding: 'utf-8') => Promise<string>>(fsReadFile);
