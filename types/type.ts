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