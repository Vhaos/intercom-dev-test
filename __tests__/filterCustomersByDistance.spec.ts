import { filterCustomersByDistance } from '../src/customers';
import prefilteredCustomers from './data/prefilteredCustomers.json';
import filteredCustomersList from './data/filteredCustomers.json';
import env from '../src/config/env';

const filterDistance = env.invitationRadiusInKM
const officeCoordinates = {
  latitude: env.officeLatitude,
  longitude: env.officeLongitude,
};

describe('Filter a list of customers within a given distance', () => {
  it('should return filtered customers list correctly', () => {
    const filteredCustomers = filterCustomersByDistance(officeCoordinates, filterDistance, prefilteredCustomers);
    expect(filteredCustomers).toEqual(filteredCustomersList);
  });

  it('should return an empty list when distance is 0km', () => {
    const filteredCustomers = filterCustomersByDistance(officeCoordinates, 0, prefilteredCustomers);
    expect(filteredCustomers).toEqual([]);
  });

  it('should return the original list when distance is very large', () => {
    const filteredCustomers = filterCustomersByDistance(officeCoordinates, 1000, prefilteredCustomers);
    expect(filteredCustomers).toEqual(prefilteredCustomers);
  });

  it('should return an empty list input list is empty', () => {
    const filteredCustomers = filterCustomersByDistance(officeCoordinates, filterDistance, []);
    expect(filteredCustomers).toEqual([]);
  });
});
