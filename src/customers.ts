import configs from './config/env';
import { Coordinate, Customer, CustomerInfo } from './typings';
import { readTextFromFile, writeTextToFile } from './utils/file';
import { getDistanceBetweenCoordinates } from './utils/math';

export async function inviteCustomers(
  officeCoordinates: Coordinate,
  invitationRadius: number,
  customerListFIlePath = configs.inputFilePath,
  outputFilePath = configs.outputFilePath,
) {
  const customers = await fetchCustomers(customerListFIlePath);
  const filteredCustomers = filterCustomersByDistance(
    officeCoordinates,
    invitationRadius,
    customers,
  );
  const filteredCustomerText = formatCustomerDataForOutput(filteredCustomers);
  writeTextToFile(outputFilePath, filteredCustomerText);
}

export async function fetchCustomers(path: string): Promise<Customer[]> {
  const text = await readTextFromFile(path);
  const JSONLines = text.trim().split('\n');
  const customerList = parseJSONAndValidateCustomerFields(JSONLines);
  return customerList;
}

function parseJSONAndValidateCustomerFields(stringifiedJSONLines: string[]): Customer[] {
  const customers = stringifiedJSONLines.map((jsonLine) => parseJSONSafely<Customer>(jsonLine));
  if (customers.every(isValidCustomerObject)) return customers;
  else throw new Error('invalid Customer Data passed in as input!');
}

function parseJSONSafely<T>(str: string): Partial<T> {
  try {
    return JSON.parse(str);
  } catch (err) {
    console.error(err, 'Error Parsing JSON');
    return {};
  }
}

function isValidCustomerObject(object: Partial<Customer>): object is Customer {
  const { user_id, name, longitude, latitude } = object;
  if (!user_id || !name || !longitude || !latitude) {
    return false;
  } else {
    return true;
  }
}

export function filterCustomersByDistance(
  officeCordinates: Coordinate,
  maxDistance: number,
  customers: Customer[],
): Customer[] {
  return customers.filter((customer) => {
    const { latitude, longitude } = customer;
    const customerCoordinates = { latitude, longitude };
    const customerDistance = getDistanceBetweenCoordinates(customerCoordinates, officeCordinates);
    return customerDistance <= maxDistance;
  });
}

export function formatCustomerDataForOutput(customers: Customer[]): string {
  const formattedCustomers = customers.map(({ user_id, name }) => ({ user_id, name }));
  formattedCustomers.sort(byAscendingCustomerID);
  return formattedCustomers.map((customer) => JSON.stringify(customer)).join('\n');
}

const byAscendingCustomerID = (customerA: CustomerInfo, customerB: CustomerInfo) =>
  customerA.user_id - customerB.user_id;
