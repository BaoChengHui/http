import path from "path";
export const rootDir = process.cwd();
export const tmpDir = path.resolve(rootDir, "node_modules", "@bch/generate");
export const outputTmpDir = path.resolve(tmpDir, "service");
export const cliDir = path.resolve(
    rootDir,
    "node_modules/.bin",
    "openapi-generator-cli"
  );
export const templateDir = path.resolve(rootDir, "template");  



