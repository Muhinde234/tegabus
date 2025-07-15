"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Topsection from "@/components/dashboard/topsection";
import ActionButton from "@/components/dashboard/ActionButton";
import { Button } from "@/components/ui/button";
import AddScheduleForm from "@/components/dialogs/addSchedule";
import {useSchedules} from "@/hooks/useSchedule";
import {formatReadableDate, formatTimeOnly} from "@/lib/utils";
import {useRoutes} from "@/hooks/useRoutes";
import {useBuses} from "@/hooks/useBuses";


const Schedules: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [timeFrame, setTimeFrame] = useState("today");

  const t = useTranslations("schedules");

  const {data:schedules, isLoading:schedulesLoading, error:schedulesError} = useSchedules();
  const {data: routes, isLoading: routesLoading} = useRoutes();
  const {data: buses, isLoading: busesLoading } = useBuses();


  const filters = [
    { key: "All", label: t("filters.all") },
    { key: "On Time", label: t("filters.onTime") },
    { key: "Delayed", label: t("filters.delayed") },
    { key: "Cancelled", label: t("filters.cancelled") },
  ];

  const tableHeads = [
    t("table.busNumber"),
    t("table.route"),
    t("table.departureTime"),
    t("table.arrivalTime"),
    t("table.driver"),
    t("table.status"),
    t("table.actions"),
  ];

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

  const getStatusTranslation = (status: string) => {
    switch (status) {
      case "On Time":
        return t("status.onTime");
      case "Delayed":
        return t("status.delayed");
      case "Cancelled":
        return t("status.cancelled");
      default:
        return status;
    }
  };

  return (
    <div>
      <Topsection />
      <div className="">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">
            {t("title")}
          </h1>
          <div className="flex gap-3 items-center">
            <AddScheduleForm buses={buses} routes={routes} />

            <Select value={timeFrame} onValueChange={setTimeFrame}>
              <SelectTrigger className="h-10 w-[120px] border border-green-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500">
                <SelectValue placeholder={t("timeFrames.today")} />
              </SelectTrigger>
              <SelectContent className="border border-gray-300">
                <SelectItem value="today">
                  {t("timeFrames.today")}
                </SelectItem>
                <SelectItem value="daily">
                  {t("timeFrames.daily")}
                </SelectItem>
                <SelectItem value="weekly">
                  {t("timeFrames.weekly")}
                </SelectItem>
                <SelectItem value="monthly">
                  {t("timeFrames.monthly")}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-2 mb-6">
          {filters.map((filter) => (
            <Button
              variant="outline"
              key={filter.key}
              onClick={() => setActiveFilter(filter.key)}
              className={getFilterButtonClass(filter.key)}
            >
              {filter.label}
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
                {schedules.map((schedule, index) => (
                  <tr
                    key={schedule.id}
                    className={`border-b border-gray-100 hover:bg-gray-50 ${index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                      }`}
                  >
                    <td className="py-4 px-4 font-medium text-gray-900">
                      {schedule.bus}
                    </td>
                    <td className="py-4 px-4 text-gray-700">
                      {schedule.from + " - " + schedule.to}
                    </td>
                    <td className="py-4 px-4 text-gray-700">
                      {formatReadableDate(schedule.departureTime) +" "+formatTimeOnly(schedule.departureTime)}
                    </td>
                    <td className="py-4 px-4 text-gray-700">
                      {formatReadableDate(schedule.arrivalTime) +" "+formatTimeOnly(schedule.arrivalTime)}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-medium">
                            {schedule.driverName || " Driver Test"
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .slice(0, 2)
                            }
                          </span>
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">
                            {schedule.driverName || " Driver Test"}
                          </div>
                          <div className="text-sm text-gray-500">
                            {schedule.driverPhone || " Driver Phone Test"}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getStatusBadgeClass("On Time")}`}
                      >
                        {getStatusTranslation("On Time")}
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
