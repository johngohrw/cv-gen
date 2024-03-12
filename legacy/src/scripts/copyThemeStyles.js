const { resolve, relative } = require("path");
const { readdir } = require("fs").promises;
const { writeFile, appendFile, copyFile, mkdir } = require("fs");

const distThemesPath = "./dist/themes";
const themesPath = "./src/themes";
const includedExtensions = ["css"];

(async () => {
  console.log(`[copyThemeStyles.js] Copying theme assets...`);
  for await (const f of getFiles(themesPath)) {
    const extension = f.slice(-4).replace(".", "");
    if (includedExtensions.includes(extension)) {
      const srcFilePath = f;
      const split = srcFilePath.split("/src/themes");
      const relativePath = split[split.length - 1];
      const destinationFilePath = distThemesPath + relativePath;
      // console.log(srcFilePath + " >> " + destinationFilePath);
      await copyFileAux(srcFilePath, destinationFilePath);
    }
  }

  return;
})();

async function* getFiles(dir) {
  const dirents = await readdir(dir, { withFileTypes: true });
  for (const dirent of dirents) {
    const res = resolve(dir, dirent.name);
    if (dirent.isDirectory()) {
      yield* getFiles(res);
    } else {
      yield res;
    }
  }
}

const copyFileAux = async (src, dest) => {
  const destFolder = dest.split("/").slice(0, -1).join("/");
  // create dir
  await mkdir(destFolder, { recursive: true }, (err) => {
    if (err) throw err;
  });
  await copyFile(src, dest, (err) => {
    if (err) throw err;
  });
};
