export interface Booking {
  id: number;
  passenger: string;
  phone: string;
  route: string;
  date: string;
  time: string;
  seats: string;
}

export type BusScheduleItem = {
  id: string;
  timeLabel: string;
  route: string;
  departureTime: string;
};

export type BusScheduleProps = {
  items: BusScheduleItem[];
};


export interface Driver {
  id: string;
  name: string;
  phone: string;
  avatar?: string;
}

export interface Bus {
  id: string;
  busNumber: string;
  status: 'Active' | 'Inactive' | 'Maintenance';
  route: string;
  driver: Driver;
}

export interface BusStats {
  totalBuses: number;
  activeBuses: number;
  inMaintenance: number;
  availableBuses: number;
}

export interface BusDetailsCardProps {
  bus: Bus;
  totalSeats: number;
  availableSeats: number;
  route: {
    from: string;
    to: string;
    departure: string;
    arrival: string;
  };
}