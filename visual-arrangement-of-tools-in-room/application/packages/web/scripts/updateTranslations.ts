import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const translationsBasePath: string = path.resolve(__dirname, '../rawTranslations');
const outputFolderBase: string = path.join(__dirname, '../src/translations');

const files = await fs.promises.readdir(translationsBasePath);

const promises = files.map(async (fileName) => {
  const fullFilePath = path.join(translationsBasePath, fileName);
  const stringData = await fs.promises.readFile(fullFilePath, { encoding: 'utf8' });
  const data = JSON.parse(stringData);
  const flattenMessages = Object.fromEntries(flattenTranslation(Object.entries(data)));
  const jsoned = 'export default  ' + JSON.stringify(flattenMessages);
  const outputFile = path.join(outputFolderBase, fileName).slice(0, -2);
  await fs.promises.writeFile(outputFile, jsoned, { encoding: 'utf-8' });
});

await Promise.all(promises);

console.log('Translations updated');

function flattenTranslation(messageEntries: Array<[string, string | object]>): Array<[string, string]> {
  return messageEntries.flatMap(([key, entry]) => {
    if (typeof entry === 'string') {
      return [[key, entry]];
    } else {
      return flattenTranslation(Object.entries(entry)).map(([innerKey, innerEntry]) => {
        return [`${key}.${innerKey}`, innerEntry];
      });
    }
  }) as Array<[string, string]>;
}
