export const getRevision = (): string => {
  return require("child_process")
    .execSync("git rev-parse HEAD")
    .toString()
    .trim()
    .substring(0, 7);
};
