import env from '../src/config/env';
import { getDistanceBetweenCoordinates } from '../src/utils/math';

const officeCordinates = {
  longitude: env.officeLongitude,
  latitude: env.officeLatitude,
};

const NorthPoleCoordinates = {
  latitude: 90,
  longitude: 0,
};

const locations = [
  {
    name: 'Equator/Prime meridian intersection',
    input: {
      latitude: 0,
      longitude: 0,
    },
    expectedOfficeDistance: 5959.289454487551,
    expectedNorthPoleDistance: 10007.557221017962,
  },
  {
    name: 'London',
    input: {
      latitude: 51.507351,
      longitude: -0.127758,
    },
    expectedOfficeDistance: 462.6927734985823,
    expectedNorthPoleDistance: 4280.19319395622,
  },
  {
    name: 'Lagos',
    input: {
      latitude: 6.524379,
      longitude: 3.379206,
    },
    expectedOfficeDistance: 5278.357482502954,
    expectedNorthPoleDistance: 9282.078374638984,
  },
  {
    name: 'Isle Of Skye',
    input: {
      latitude: 57.535927,
      longitude: -6.226273,
    },
    expectedOfficeDistance: 466.6342307627635,
    expectedNorthPoleDistance: 3609.8452019422703,
  },
  {
    name: 'The North Pole',
    input: {
      latitude: 90,
      longitude: 0,
    },
    expectedOfficeDistance: 4076.4752449472107,
    expectedNorthPoleDistance: 0,
  },
];

describe.each(locations)('get Distance Between Coordinates', (location) => {
  it(`returns expected distance between ${location.name} and the Dublin office`, () => {
    const locationCoordinates = location.input;
    const distance = getDistanceBetweenCoordinates(officeCordinates, locationCoordinates);
    expect(distance).toBe(location.expectedOfficeDistance);
  });

  it(`returns expected distance from The North Pole to ${location.name}`, () => {
    const locationCoordinates = location.input;
    const distance = getDistanceBetweenCoordinates(NorthPoleCoordinates, locationCoordinates);
    expect(distance).toBe(location.expectedNorthPoleDistance);
  });
});
