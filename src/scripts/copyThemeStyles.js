const { resolve } = require("path");
const { readdir } = require("fs").promises;
const { writeFile, appendFile } = require("fs");

const distThemesPath = "./dist/themes";
const themesPath = "./src/themes";
const includedExtensions = ["css"];

(async () => {
  console.log(`[copyThemeStyles.js] Copying theme assets...`);

  for await (const f of getFiles(themesPath)) {
    // console.log(f, distThemesPath);
    const extension = f.slice(-4).replace(".", "");
    if (includedExtensions.includes(extension)) {
      console.log("will copy", f, "to ", distThemesPath);
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

const copyFile = async (src, dist) =>
  await fs.copyFile(src, dist, (err) => {
    if (err) {
      console.log("Error Found:", src, dist);
    } else {
      console.log("else", src, dist);
    }
  });
