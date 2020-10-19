import configs from './config/env';
import { Coordinate, Customer, CustomerInfo } from './typings';
import { readTextFromFile, writeTextToFile } from './utils/file';
import { getDistanceBetweenCoordinates } from './utils/math';

/**
 * Fetches customers from a file, filters the list for customers within `invitationRadius`
 * of `officeCoordinates`, then outputs that list of customers to a file
 * @param officeCoordinates latitude/longitude object of the office to send invites from
 * @param invitationRadius Maxium distance from the office to send invites to
 * @param customerListFIlePath File location to get list of customer **defaults to data/customer.txt**
 * @param outputFilePath File Location to print invited customers **defaults to data/output.txt**
 */
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

/**
 * Fetch customers from a JSONLine formated file, and return list of
 * customers if they are all valid `Customer` objects.
 * @param path Location of text file to get text from
 */
export async function fetchCustomers(path: string): Promise<Customer[]> {
  const text = await readTextFromFile(path);
  const trimmedText = text.trim();

  if (trimmedText.length === 0) return [];

  const JSONLines = trimmedText.split('\n');
  const customerList = parseJSONAndValidateCustomerFields(JSONLines);
  return customerList;
}

/**
 * Attempts to parse a list of JSONLines (in case of invalid JSON)
 * then validates the parsed JSON to see if they are all valid customer objects
 * @param stringifiedJSONLines array of stringified JSON to parse
 */
function parseJSONAndValidateCustomerFields(stringifiedJSONLines: string[]): Customer[] {
  const customers = stringifiedJSONLines.map((jsonLine) => parseJSONSafely<Customer>(jsonLine));
  if (customers.every(isValidCustomerObject)) return customers;
  else throw new Error('invalid customer data passed in as input!');
}

/**
 * Attempts to parse JSON to Object, else logs error and safely returns
 * @param str stringified JSON to parse
 */
function parseJSONSafely<T>(str: string): Partial<T> {
  try {
    return JSON.parse(str);
  } catch (err) {
    console.error(err, 'Error Parsing JSON');
    return {};
  }
}

/**
 * A _very_ simple object validator to ensure all `Customer` fields are present
 * @param object object to validate
 */
function isValidCustomerObject(object: Partial<Customer>): object is Customer {
  const { user_id, name, longitude, latitude } = object;
  if (!user_id || !name || !longitude || !latitude) {
    return false;
  } else {
    return true;
  }
}

/**
 * Filters a list of customers and returns customers that are within a certain distance of
 * an origin.
 * @param officeCordinates Origin to calculate distance from
 * @param maxDistance Distance that filtered customers need to be within
 * @param customers List of customers
 */
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

/**
 * Prepares a list of customer objects for I/O
 * @param customers customer objects to format for I/O
 */
export function formatCustomerDataForOutput(customers: Customer[]): string {
  const formattedCustomers = customers.map(({ user_id, name }) => ({ user_id, name }));
  formattedCustomers.sort(byAscendingCustomerID);
  return formattedCustomers.map((customer) => JSON.stringify(customer)).join('\n');
}

/**
 * Sorting helper function
 */
const byAscendingCustomerID = (customerA: CustomerInfo, customerB: CustomerInfo) =>
  customerA.user_id - customerB.user_id;
