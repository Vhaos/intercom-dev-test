import { promises } from 'fs';

export async function readTextFromFile(path: string): Promise<string> {
  if (!isValidFilePath(path)) throw Error('invalid file path!');

  const fileText = await promises.readFile(path, { encoding: 'utf8', flag: 'r' });
  return fileText;
}

export async function writeTextToFile(path: string, text: string): Promise<void> {
  await promises.writeFile(path, text);
}

/**
 * Checks if a path to a file is valid i.e. if the file exists
 * @param path path to the file to check
 */
async function isValidFilePath(path: string): Promise<boolean> {
  try {
    await promises.access(path);
  } catch (err) {
    console.error(err);
    return false;
  }
  return true;
}
