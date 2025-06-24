
import Topsection from "../../../components/dashboard/topsection";
import { tickets } from "../../../helpers/data";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import BusSchedules from "@/components/dashboard/BusSchedules";

export default function Bookings() {
  const tableHeads = ["Passenger", "Route", "Date", "Time", "Seat", "Actions"];

  return (
    <>
      <div className="px-6 bg-white">
        <div>
          <Topsection />
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold">All Bookings list</h1>
            <p className="text-sm text-gray-500">
              Showing {tickets.length} bookings
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button className="flex items-center px-4 py-2 text-white bg-[#1EA17E] hover:bg-green-700 rounded-full text-sm font-medium transition-colors whitespace-nowrap">
              Add <span className="ml-1 text-xl leading-none">＋</span>
            </button>

            <Select>
              <SelectTrigger className="w-full sm:w-[48%] md:w-[23%] border border-green-300 p-2 sm:p-3 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500">
                <SelectValue placeholder="Monthly" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">weekly</SelectItem>
                <SelectItem value="dark">daily</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
       <BusSchedules/>
      
      </div>
    </>
  );
}
