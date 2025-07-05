"use client";

import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select";
import Topsection from "@/components/dashboard/topsection";
import ActionButton from "@/components/dashboard/ActionButton";
import { Button } from "@/components/ui/button";
import AddScheduleForm from "@/components/dialogs/addSchedule";

interface Driver {
  name: string;
  phone: string;
  avatar: string;
}

interface Schedule {
  id: string;
  busNumber: string;
  route: string;
  departureTime: string;
  arrivalTime: string;
  driver: Driver;
  status: "On Time" | "Delayed" | "Cancelled";
}

const Schedules: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [timeFrame, setTimeFrame] = useState("today");

  const baseSchedule: Omit<Schedule, "id" | "status"> = {
    busNumber: "RAC 456 C",
    route: "Kigali to Bujumbura",
    departureTime: "08:45",
    arrivalTime: "14:45",
    driver: {
      name: "Muhinde Dosta",
      phone: "+250791154390",
      avatar: "string",
    },
  };

  const [schedules] = useState<Schedule[]>(() => {
    const statuses: ("On Time" | "Delayed" | "Cancelled")[] = [
      "On Time",
      "Delayed",
      "Cancelled",
    ];
    return Array.from({ length: 20 }, (_, i) => ({
      ...baseSchedule,
      id: (i + 1).toString(),
      status: statuses[i % statuses.length],
      driver:
        i % 5 === 0
          ? {
              ...baseSchedule.driver,
              name: `Driver ${Math.floor(i / 5) + 1}`,
            }
          : baseSchedule.driver,
    }));
  });

  const filters = ["All", "On Time", "Delayed", "Cancelled"];
  const tableHeads = [
    "Bus-Number",
    "Route",
    "Departure-Time",
    "Arrival-Time",
    "Driver",
    "Status",
    "Actions",
  ];

  const getFilteredSchedules = () => {
    if (activeFilter === "All") return schedules;
    return schedules.filter((schedule) => schedule.status === activeFilter);
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "On Time":
        return "bg-green-100 text-green-800 border border-green-200 ";
      case "Delayed":
        return "bg-yellow-100 text-yellow-800 border border-yellow-200 ";
      case "Cancelled":
        return "bg-red-100 text-red-800 border border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border border-gray-200";
    }
  };

  const getFilterButtonClass = (filter: string) => {
    const baseClasses =
      "px-4 py-4 rounded-full  font-medium transition-colors border-border-gray-400  cursor-pointer";

    if (filter === activeFilter) {
      return `${baseClasses} bg-[#1EA17E] text-white hover:bg-green-700`;
    }
    return `${baseClasses} bg-white text-gray-700 border border-gray-300  hover:bg-green-300`;
  };

  return (
    <div className=" px-6 bg-gray-50 ">
      <Topsection />
      <div className="">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Schedules</h1>
          <div className="flex gap-3 items-center">
            <AddScheduleForm />

            <Select value={timeFrame} onValueChange={setTimeFrame}>
              <SelectTrigger className="h-10 w-[120px] border border-green-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500">
                <SelectValue placeholder="Today" />
              </SelectTrigger>
              <SelectContent className="border border-gray-300">
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-2 mb-6">
          {filters.map((filter) => (
            <Button
              variant="outline"
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={getFilterButtonClass(filter)}
            >
              {filter}
            </Button>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100 ">
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
              <tbody>
                {getFilteredSchedules().map((schedule, index) => (
                  <tr
                    key={schedule.id}
                    className={`border-b border-gray-100 hover:bg-gray-50 ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                    }`}
                  >
                    <td className="py-4 px-4 font-medium text-gray-900">
                      {schedule.busNumber}
                    </td>
                    <td className="py-4 px-4 text-gray-700">
                      {schedule.route}
                    </td>
                    <td className="py-4 px-4 text-gray-700">
                      {schedule.departureTime}
                    </td>
                    <td className="py-4 px-4 text-gray-700">
                      {schedule.arrivalTime}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-medium">
                            {schedule.driver.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .slice(0, 2)}
                          </span>
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">
                            {schedule.driver.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {schedule.driver.phone}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getStatusBadgeClass(
                          schedule.status
                        )}`}
                      >
                        {schedule.status}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <ActionButton />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedules;
