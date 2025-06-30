'use client';

import { Booking } from '../../types/type';
import { Plus } from 'lucide-react';
import { useState } from 'react';

const bookings: Booking[] = [
  {
    id: 1,
    passenger: 'Muhinde Dosta',
    phone: '+250791109900',
    route: 'Kigali to Kampala',
    date: '05 Mar 2025',
    time: '14:30',
    seats: 'A1, B1',
  },
  {
    id: 2,
    passenger: 'Gaju Queen',
    phone: '+25079115498',
    route: 'Kigali to Nairobi',
    date: '18 Jun 2025',
    time: '09:15',
    seats: 'B10',
  },
  {
    id: 3,
    passenger: 'Pamella',
    phone: '+25978039983',
    route: 'Kigali to Bujumbura',
    date: '27 Aug 2025',
    time: '16:45',
    seats: 'C1',
  },
  {
    id: 4,
    passenger: 'Dositha',
    phone: '+250791154389',
    route: 'Kigali to Bujumbura',
    date: '27 Aug 2025',
    time: '16:45',
    seats: 'C1',
  },
  {
    id: 5,
    passenger: 'Evodie',
    phone: '+250791154389',
    route: 'Kigali to Bujumbura',
    date: '27 Aug 2025',
    time: '16:45',
    seats: 'C1',
  },
  {
    id: 6,
    passenger: 'Muhinde',
    phone: '+250791154389',
    route: 'Kigali to Bujumbura',
    date: '27 Aug 2025',
    time: '16:45',
    seats: 'C1',
  },
];

const RecentBookings = () => {
  const [filter, setFilter] = useState('Monthly');

  return (
    <section className="bg-white rounded-xl shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Recent Bookings</h2>
          <p className="text-sm text-gray-500">Showing 10 of 50 bookings</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="flex items-center bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full text-sm font-medium transition">
            Add <Plus className="ml-2 w-4 h-4" />
          </button>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border rounded-full px-4 py-1 text-sm text-gray-700"
          >
            <option value="Monthly">Monthly</option>
            <option value="Weekly">Weekly</option>
            <option value="Daily">Daily</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-700">
          <thead className="text-gray-600 border-b">
            <tr>
              <th className="py-2 px-4 font-medium">Passenger</th>
              <th className="py-2 px-4 font-medium">Route</th>
              <th className="py-2 px-4 font-medium">Date / Time</th>
              <th className="py-2 px-4 font-medium">Seats</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4">
                  <div className="font-semibold">{booking.passenger}</div>
                  <div className="text-xs text-gray-500">{booking.phone}</div>
                </td>
                <td className="py-2 px-4">{booking.route}</td>
                <td className="py-2 px-4">{`${booking.date} ${booking.time}`}</td>
                <td className="py-2 px-4">{booking.seats}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default RecentBookings;
