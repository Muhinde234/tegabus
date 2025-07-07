import { tickets } from "../../helpers/data";
import avatar from "../../public/images/avatar.png";
import Image from "next/image";
import ActionButton from "./ActionButton";



const BusSchedules = () => {
  const tableHeads = ["Passenger", "Route", "Date", "Time", "Seat", "Actions"];
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
            {tickets.map((ticket, idx) => (
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
                      {ticket.holder_firstname + " " + ticket.holder_lastname}
                    </div>
                    <div className="text-gray-500 text-xs">
                      {ticket.holder_phonenumber}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap sm:px-6 text-sm">
                  {ticket.origin + " to " + ticket.destination}
                </td>
                <td className="px-4 py-4 whitespace-nowrap sm:px-6 text-sm">
                  {ticket.date}
                </td>
                <td className="px-4 py-4 whitespace-nowrap sm:px-6 text-sm">
                  {ticket.time}
                </td>
                <td className="px-4 py-4 whitespace-nowrap sm:px-6 cursor-pointer text-sm">
                  {ticket.seats}
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