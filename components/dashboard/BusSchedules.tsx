"use client"

import { tickets } from "@/helpers/data";
import avatar from "@/public/images/avatar.png";
import Image from "next/image";
import ActionButton from "./ActionButton";
import {useBookings} from "@/hooks/useBooking";
import {formatReadableDate} from "@/lib/utils";





const BusSchedules = () => {
  const tableHeads = [
  "passenger",
  "route",
  "date",
  "time",    
  "seat",
  "Actions"
];


  const {data: bookings, isLoading} = useBookings();

 
  return (
    <>
      <div className="overflow-x-auto rounded-lg shadow-sm border border-gray-200">
        <table className="overflow-x-auto min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              {tableHeads.map((head, idx) => (
                <th
                  key={idx}
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {bookings.map((ticket, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="px-4 py-4 whitespace-nowrap sm:px-6 flex items-center gap-2 text-sm">
                  <Image
                    src={avatar}
                    alt="profile pic"
                    height={40}
                    width={40}
                  />

                  <div>
                    <div className="font-medium text-gray-900">
                      {ticket.fullName}
                    </div>
                    <div className="text-gray-500 text-xs">
                      {ticket.phoneNumber}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap sm:px-6 text-sm">
                  {ticket.origin + " to " + ticket.destination}
                </td>
                <td className="px-4 py-4 whitespace-nowrap sm:px-6 text-sm">
                  {formatReadableDate(ticket.departureTime)}
                </td>
                <td className="px-4 py-4 whitespace-nowrap sm:px-6 text-sm">
                  {formatReadableDate(ticket.bookingDate)}
                </td>
                <td className="px-4 py-4 whitespace-nowrap sm:px-6 cursor-pointer text-sm">
                  {ticket.seatNumber}
                </td>
                <td className="px-4 py-4 whitespace-nowrap sm:px-6">
                  <ActionButton />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default BusSchedules;

