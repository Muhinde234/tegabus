export interface Route {
  origin: string;
  destination: string;
  price: number;
  durationInMinutes: number;
  distanceInKm: number;
}


export type BusStatus = 'ACTIVE' | 'INACTIVE' | 'MAINTENANCE';

export interface Bus {
  id: number;
  plateNumber: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBus {
    plateNumber: string;
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

export type UserRole = 'ADMIN' | 'PASSENGER' | 'DRIVER' | 'MANAGER' | 'VERIFIER';

export interface RoleStatsResponse {
  roleCounts: Record<UserRole, number>;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  nationality: string;
  role: UserRole;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Page<T> {
  content: T[];
  pageable: Pageable;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  sort: Sort;
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}

export interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: Sort;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

export interface Sort {
  empty: boolean;
  unsorted: boolean;
  sorted: boolean;
}

export interface LocalStorageUser {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  nationality: string;
  password: string;
}

export interface CreateUser {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: UserRole;
}

export interface MessageResponse {
  message: string;
}

export interface ApiError {
  type: string;
  title: string;
  status: number;
  detail: string;
  timestamp: string;
  instance: string;
  violations?: ValidationError[];
}

export interface ValidationError {
  field: string;
  message: string;
  rejectedValue: string;
  code: string;
}


export interface VerifyEmailRequest {
  token: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}


export interface LoginResponse {
  message: string;
  accessToken: string;
  user: LocalStorageUser;
  expiresIn: number;
}

export interface RouteRequest {
  startLocation: string;
  endLocation: string;
  distance: number;
  price: number;
  travelTime: string;
}

export interface RouteResponse extends RouteRequest {
  id: number;
  createdAt: string;
  updatedAt: string;
}

export type UserPageResponse = Page<User>;


export interface ChatRequest {
  message: string;
}

export interface ChatResponse {
  reply: string;
}


export interface CreateUserRequest {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  nationality: string;
  role: UserRole;
}

export interface CreatedUserResponse {
  message: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: UserRole;
  };
}

export interface ScheduleRequest {
  busId: number;
  routeId: number;
  departureTime: string;
  arrivalTime: string;
  driverName: string;
  driverPhone: string;
}


export interface ScheduleResponse {
  id: number;
  bus: string;
  price: number;
  driverName: string | null;
  driverPhone: string | null;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  totalSeats: number;
  remainingSeats: number;
  createdAt: string;
  updatedAt: string;
}


export interface SeatLayoutResponse {
  id: number;
  bus: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  driverName: string | null;
  driverPhone: string | null;
  totalSeats: number;
  remainingSeats: number;
  pricePerSeat: number;
  seats: SeatInfo[];
}

export interface SeatInfo {
  seatId: number;
  seatNumber: string;
  booked: boolean;
  version: number;
}

export interface BookingResponse {
  id: number;
  fullName: string;
  phoneNumber: string;
  origin: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  bookingDate: string;
  qrCodeUrl: string;
  seatNumber: string;
}

export interface ScheduleParams {
  from?: string;
  to?: string;
  departureDate?: string;
}

