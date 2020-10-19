import env from './config/env';
import { inviteCustomers } from './customers';

const invitationRadius = env.invitationRadiusInKM;
const officeCordinates = {
  longitude: env.officeLongitude,
  latitude: env.officeLatitude,
};

/**
 * Main app entrypoint
 */
const start = async () => {
  await inviteCustomers(officeCordinates, invitationRadius);
};

start();
