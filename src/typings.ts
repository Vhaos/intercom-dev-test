/**
 * Expected info fields for customer input data
 */
export type CustomerInfo = {
  user_id: number;
  name: string;
};

/**
 * Fields for determining location
 */
export type Coordinate = {
  /**
   * Earth geographic coordinate unit (in degrees)
   */
  latitude: number;
  /**
   * Earth geographic coordinate unit (in degrees)
   */
  longitude: number;
};

/**
 * Expected Customer input data fields
 */
export type Customer = CustomerInfo & Coordinate;
