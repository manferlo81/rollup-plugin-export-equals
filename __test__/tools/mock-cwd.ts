import mock from 'mock-fs';
import { createFileContent } from './create-file-content';

export async function mockCWD<R>(callback: () => R | Promise<R>): Promise<R> {
  mock(
    {
      [process.cwd()]: {
        'default-export.d.ts': createFileContent(
          'const num = 10;',
          'export default num;',
        ),
        'named-export.d.ts': createFileContent(
          'const num = 10;',
          'export { num };',
        ),
      },
    },
    {
      createCwd: false,
      createTmp: false,
    },
  );
  try {
    return await callback();
  } finally {
    mock.restore();
  }
}
