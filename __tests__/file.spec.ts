import { readTextFromFile, writeTextToFile } from '../src/utils/file';
import { readFile } from './helpers';

const inputFilePath = '__tests__/data/fullCustomerList.txt';
const outputFilePath = '__tests__/data/testUtilFunctionOutput.txt';

describe('read text from file', () => {
  it('should read text from a file', async () => {
    const text = await readTextFromFile(inputFilePath);
    const expectedText = await readFile(inputFilePath);
    expect(text).toBe(expectedText);
  });

  it('should throw an error if cannot read/access file', async () => {
    const randomFileName = 'abcdefghijklmnopqrsabcdefghijklmnopqrs.txt';
    expect(readTextFromFile(randomFileName)).rejects.toThrow(/cannot read\/access file/);
  });
});

describe('write text to file', () => {
  it('should write text to a file', async () => {
    const sampleText = 'test';
    await writeTextToFile(outputFilePath, sampleText);

    const text = await readFile(outputFilePath);
    expect(text).toBe(sampleText);
  });

  it('should throw an error if cannot write to file', async () => {
    const randomFileName = 'abcdefghijklmnopqrsabcdefghijklmnopqrs.txt';
    expect(readTextFromFile(randomFileName)).rejects.toThrow();
  });
});
