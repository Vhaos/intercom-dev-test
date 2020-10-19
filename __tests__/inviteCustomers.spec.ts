import env from '../src/config/env';
import { inviteCustomers } from '../src/customers';
import { readFile } from './helpers';

const invitationRadius = env.invitationRadiusInKM;
const officeCordinates = {
  longitude: env.officeLongitude,
  latitude: env.officeLatitude,
};
const inputFilePath = './__tests__/data/fullCustomerList.txt';
const outputFilePath = './__tests__/data/testOutput.txt';
const expectedOutputFilePath = './__tests__/data/expectedOutput.txt';

describe('Invite Customers', () => {
  it('should correctly fetch, filter and create an invite list of customers', async () => {
    await inviteCustomers(officeCordinates, invitationRadius, inputFilePath, outputFilePath);

    const output = await readFile(outputFilePath);
    const expectedOutput = await readFile(expectedOutputFilePath);

    expect(output).toEqual(expectedOutput);
  });

  it('should output an empty text file if input file is empty', async () => {
    const emptyInputFile = './__tests__/data/empty.txt'
    await inviteCustomers(officeCordinates, invitationRadius, emptyInputFile, outputFilePath);

    const output = await readFile(outputFilePath);
    const emptyOutput = await readFile(emptyInputFile);

    expect(output).toEqual(emptyOutput);
  });
});