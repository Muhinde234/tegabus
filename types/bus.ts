export interface Route {
  from: string;
  to: string;
  price: string;
}

export interface BusCompany {
  name: string;
  numberOfBuses: number;
  routes: Route[];
}
