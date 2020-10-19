import { fetchCustomers } from '../src/customers';
import fullCustomerList from './data/fullCustomerList.json';

describe('Fetching customers from a file', () => {
  it('should fetch and return an array of customer objects from a file', async () => {
    const customers = await fetchCustomers('__tests__/data/fullCustomerList.txt');
    expect(customers).toEqual(fullCustomerList);
  });

  it('should throw an error if input file is missing/inaccessible', async () => {
    const randomFileName = 'abcdefghijkl.txt';
    expect(fetchCustomers(randomFileName)).rejects.toThrow(/cannot read/);
  });

  it('should return an empty array of customers if input file is empty', async () => {
    const customers = await fetchCustomers('__tests__/data/empty.txt');
    expect(customers).toEqual([]);
  });

  it('should throw an error if a JSONLine has invalid syntax', async () => {
    const invalidJSONLineFile = '__tests__/data/invalidJSONLines.txt';
    expect(fetchCustomers(invalidJSONLineFile)).rejects.toThrow(/invalid customer data/);
  });

  it('should throw an error if a JSONLine has invalid syntax', async () => {
    const missingFieldsJSONLineFile = '__tests__/data/missingFields.txt';
    expect(fetchCustomers(missingFieldsJSONLineFile)).rejects.toThrow(/invalid customer data/);
  });
});
