import { formatCustomerDataForOutput } from '../src/customers';
import { formattedAndSortedCustomerData as expectedFormattedData } from './data/expectedInviteCustomersOutput';
import customers from './data/filteredCustomers.json';

describe('Prepares a list of Customer objects for I/O', () => {
  it('should take a list of Customer objects and return a sorted list of Customer Info (name, user_id)', async () => {
    const formattedCustomers = formatCustomerDataForOutput(customers);
    expect(formattedCustomers).toEqual(expectedFormattedData);
  });

  it('should return an empty string if input data to format is empty', async () => {
    const formattedCustomers = formatCustomerDataForOutput([]);
    expect(formattedCustomers).toEqual('');
  });

  it('should return a sorted list based on user_id', async () => {
    const customerList = [
      {
        latitude: 53.038056,
        user_id: 26,
        name: 'Stephen McArdle',
        longitude: -7.653889,
      },
      {
        latitude: 52.986375,
        user_id: 12,
        name: 'Christina McArdle',
        longitude: -6.043701,
      },
      {
        latitude: 54.0894797,
        user_id: 8,
        name: 'Eoin Ahearn',
        longitude: -6.18671,
      },
    ];

    const reversedCustomerList = `{"user_id":8,"name":"Eoin Ahearn"}
{"user_id":12,"name":"Christina McArdle"}
{"user_id":26,"name":"Stephen McArdle"}`;

    const formattedCustomers = formatCustomerDataForOutput(customerList);
    expect(formattedCustomers).toEqual(reversedCustomerList);
  });
});
