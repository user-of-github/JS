import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';
import sharp from 'sharp';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const texturesPaths: Array<[string, string]> = [
  [
    path.resolve(__dirname, '../public/assets/images/textures/wall'),
    path.resolve(__dirname, '../public/assets/images/textures/wall/previews')
  ],
  [
    path.resolve(__dirname, '../public/assets/images/textures/floor'),
    path.resolve(__dirname, '../public/assets/images/textures/floor/previews')
  ]
];

const compressImagesInFolder = async (texturesPath: string, texturesCompressedPath: string): Promise<void> => {
  const filesList = await fs.promises.readdir(texturesPath);

  // [fullPath, filName, isFile]
  type FileStatRes = [string, boolean];
  const filesStats = await Promise.all(
    filesList.map(
      (file) =>
        new Promise<FileStatRes>((resolve) => {
          const filePath = path.resolve(texturesPath, file);

          fs.stat(filePath, (err, data) => {
            if (err) {
              throw new Error(`Could not find file: ${filePath}`);
            }

            resolve([filePath, data.isFile()]);
          });
        })
    )
  );

  filesStats.forEach(([filePath, isFile]) => {
    if (!isFile) {
      return;
    }

    const destinationPath = path.resolve(texturesCompressedPath, path.parse(filePath).name + '.avif');

    sharp(filePath).resize(300).avif().toFile(destinationPath);
  });
};

const main = async (): Promise<void> => {
  const promises = texturesPaths.map(
    (paths) =>
      new Promise((resolve) => {
        compressImagesInFolder(...paths).then(resolve);
      })
  );

  await Promise.all(promises);
};

await main();
