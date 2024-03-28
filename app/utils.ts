import * as childProcess from 'child_process';

export const getRevision = (): string => childProcess
  .execSync('git rev-parse HEAD')
  .toString()
  .trim()
  .substring(0, 7);
