
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
import {program}   from "commander";
import {consola} from "consola"
import { getDateInfo } from "./date";
import { cliDir, outputTmpDir, templateDir } from "./pathInfos";
import { excludes, savedFiles } from "./config";

interface CmdObj {
  input?:string
  output?:string
}

program
  .command('generate')
  .option('-i, --input <input>', 'Specify the input')
  .option('-o, --output <output>', 'Specify the output')
  .action((cmdobj:CmdObj)=>{
    runTask(cmdobj)
  })
program
.parse(process.argv);

async function runTask(cmdobj:CmdObj) {
  const {input,output} = cmdobj
  if(!input){
    consola.error('input is empty')
    return
  }
  if(!output){
    consola.error('output is empty')
    return
  }
  const cliCmd = getCliCmd(input,output)
  exec(cliCmd, (error, stdout, stderr) => {
    if (error) {
      console.log(error);
      return;
    }
    if (stderr) {
      console.log(stderr);
      return;
    }
    console.log(stdout);
    generateCodes(output)
  });
}
function getCliCmd(input:string,output:string) {
  const cliCmd = `${cliDir} generate -g typescript-axios -i ${input} -o ${outputTmpDir} --template-dir ${templateDir} --additional-properties=apiPackage=apis,modelPackage=models,withSeparateModelsAndApi=true,stringEnums=true,withClass=true`;
  return cliCmd
}

async function generateCodes(output:string) {
  copyBaseFiles(output)
    const inputs = await fg("**/*", { cwd: outputTmpDir, ignore: excludes });

  let changeContent = "";
  inputs.forEach((item) => {
    if (
      pathExistsSync(path.resolve(outputTmpDir, item)) &&
      pathExistsSync(path.resolve(output, item))
    ) {
      const afterContent = readFileSync(
        path.resolve(outputTmpDir, item),
        "utf-8"
      );
      const curContent = readFileSync(path.resolve(output, item), "utf-8");
      const differences = diffTrimmedLines(curContent, afterContent);
      let content = "";
      differences.forEach((part) => {
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
  removeSync(output);
  copySync(outputTmpDir, output, {
    filter: (src, dest) => {
      return !micromatch.isMatch(src, excludes, { dot: true });
    },
  });
  if (changeContent) {
    const logPath = path.resolve(output, "CHANGELOG.md");
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

function copyBaseFiles(output:string) {
  savedFiles.forEach((item) => {
    if (existsSync(path.resolve(output, item))) {
      copyFileSync(
        path.resolve(output, item),
        path.resolve(outputTmpDir, item)
      );
    }
  });
}





