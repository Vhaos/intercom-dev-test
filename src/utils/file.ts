import { promises } from 'fs';

/**
 * Asynchronously reads data from a file and returns the encoded text
 * @param path Path to the file to read
 */
export async function readTextFromFile(path: string): Promise<string> {
  if (await isValidFilePath(path)){
    const fileText = await promises.readFile(path, { encoding: 'utf8', flag: 'r' });
    return fileText;
  } else {
    throw new Error(`cannot read/access file`);
  }
}

/**
 * Checks if a path to a file is valid i.e. if the file exists and tests a user's permissions
 * for reading
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

/**
 * Asynchronously writes a string to a file, replacing the file if it already exists
 * @param path Path/file to write text to
 * @param text text to write
 */
export async function writeTextToFile(path: string, text: string): Promise<void> {
  await promises.writeFile(path, text);
}
