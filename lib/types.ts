
export interface Route {
  origin: string;
  destination: string;
  price: number;
  durationInMinutes: number;
  distanceInKm: number;
}


export type BusStatus = 'ACTIVE' | 'INACTIVE' | 'MAINTENANCE';

export interface Bus {
  id: string;
  plateNumber: string;
  status: BusStatus;
  route: Route;
  driverName: string;
}

export interface CreateBus {
  plateNumber: string;
  status: BusStatus;
  route: Route;
  driverName: string;
}

export interface Schedule {
  id: string;
  busId: string;
  departureTime: string; 
  arrivalTime: string;  
  availableSeats: number;
  totalSeats: number;
  travelDate: string;    
}

export interface CreateSchedule {
  busId: string;
  departureTime: string;
  arrivalTime: string;
  availableSeats: number;
  totalSeats: number;
  travelDate: string;
}


export interface Booking {
  id: string;
  passengerName: string;
  travelDate: string;    
  seatNumber: string;
  scheduleId: string;
  route: Route;
}

export interface CreateBooking {
  passengerName: string;
  travelDate: string;
  seatNumber: string;
  scheduleId: string;
}


export interface PaymentRequest {
  amount: number;
  email: string;
  phone: string;
  name: string;
  redirectUrl: string;
}

export interface PaymentResponse {
  paymentUrl: string;
  transactionId: string;
  status: 'PENDING' | 'SUCCESS' | 'FAILED';
}


export type UserRole = 'ADMIN' | 'PASSENGER' | 'DRIVER';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
}

export interface CreateUser {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: UserRole;
}


export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}
