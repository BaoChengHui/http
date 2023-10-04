import path from "path";
import { exec } from "child_process";
import {
  copySync,
  removeSync,
  copyFileSync,
  ensureFileSync,
  existsSync,
  readFileSync,
  writeFileSync,
  pathExistsSync,
} from "fs-extra";
import micromatch from "micromatch";
import fg from "fast-glob";
import {  diffTrimmedLines } from "diff";

const rootDir = process.cwd();
const tmpDir = path.resolve(rootDir, "node_modules", "@bch/generate");
const outputTmpDir = path.resolve(tmpDir, "service");
const cliDir = path.resolve(
  rootDir,
  "node_modules/.bin",
  "openapi-generator-cli"
);
const inputDir = path.resolve(rootDir, "5.json");
const outputDir = path.resolve(rootDir, "service");
const templateDir = path.resolve(rootDir, "template");

const cliCmd = `${cliDir} generate -g typescript-axios -i ${inputDir} -o ${outputTmpDir} --template-dir ${templateDir} --skip-validate-spec --enable-post-process-file --additional-properties=apiPackage=apis,modelPackage=models,withSeparateModelsAndApi=true,stringEnums=true`;

function run() {
  exec(cliCmd, (error, stdout, stderr) => {
    console.log("error", error);
    console.log("stderr", stderr);
    if (error) {
      return;
    }
    if (stderr) {
      return;
    }
    console.log(stdout);
    callSuccess();
  });
}

const excludes = [
  "**/.openapi-generator",
  "**/.openapi-generator-ignore",
  "**/.gitignore",
  "**/.npmignore",
  "**/base.ts",
  "**/common.ts",
  "**/configuration.ts",
  "**/git_push.sh",
];

const savedFiles = ["CHANGELOG.md", "instance.ts"];

async function copyBaseFiles() {
  savedFiles.forEach((item) => {
    if (existsSync(path.resolve(outputDir, item))) {
      copyFileSync(
        path.resolve(outputDir, item),
        path.resolve(outputTmpDir, item)
      );
    }
  });
}

async function callSuccess() {
  copyBaseFiles();
  const inputs = await fg("**/*", { cwd: outputTmpDir, ignore: excludes });

  let changeContent = "";
  inputs.forEach((item) => {
    
    if (
      pathExistsSync(path.resolve(outputTmpDir, item)) &&
      pathExistsSync(path.resolve(outputDir, item))
    ) {
      const afterContent = readFileSync(
        path.resolve(outputTmpDir, item),
        "utf-8"
      );
      const curContent = readFileSync(path.resolve(outputDir, item), "utf-8");
      const differences = diffTrimmedLines(curContent, afterContent);
      let content = "";
      differences.forEach((part) => {
        //  const value = part.value.replace(/\n/g,'\\n')
        const added = part.added ? `<span style='color:red'>++</span>` : "";
        const removed = part.removed
          ? `<span style='color:green'>--</span>`
          : "";
        if (added || removed) {
          content += `<div>${added}${removed}&nbsp;&nbsp;<code>${part.value}</code></div>`;
        }
      });
      if (content) {
        content = item + "\n" + content;
        changeContent += content + "\n";
      }
    }
  });
  removeSync(outputDir);
  copySync(outputTmpDir, outputDir, {
    filter: (src, dest) => {
      return !micromatch.isMatch(src, excludes, { dot: true });
    },
  });
  if (changeContent) {
    const logPath = path.resolve(outputDir, "CHANGELOG.md");
    ensureFileSync(logPath);
    const changeLogContent = readFileSync(logPath);
    writeFileSync(
      logPath,
      "### " +
        getDateInfo() +
        "\r\n #### " +
        changeContent +
        "</br>" +
        changeLogContent
    );
  }
  removeSync(outputTmpDir);
}

run();

function getDateInfo() {
  const date = new Date();
  const y = date.getFullYear();
  const m = (date.getMonth() + 1).toString().padStart(2, "0");
  const d = date.getDate().toString().padStart(2, "0");
  const h = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const s = date.getSeconds().toString().padStart(2, "0");
  return `${y}-${m}-${d}:${h}:${minutes}:${s}`;
}
