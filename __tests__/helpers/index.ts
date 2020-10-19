import { promises } from "fs";

export const readFile = async (path: string) => {
  try {
    return await promises.readFile(path, { encoding: 'utf8' });
  } catch (error) {
    console.error(error);
    throw new Error('error trying to read file');
  }
};
