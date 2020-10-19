import env from './config/env';
import { inviteCustomers } from './customers';

const invitationRadius = env.invitationRadiusInKM;
const officeCordinates = {
  longitude: env.officeLongitude,
  latitude: env.officeLatitude,
};

const start = async () => {
  await inviteCustomers(officeCordinates, invitationRadius);
};

start();
