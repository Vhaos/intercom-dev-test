export type CustomerInfo = {
  user_id: number;
  name: string;
};

export type Coordinate = {
  latitude: number;
  longitude: number;
};

export type Customer = CustomerInfo & Coordinate;
