"use client";

import React, { useState, useCallback, useMemo } from "react";
import { Plus } from "lucide-react";
import StatsCard from "../../../components/dashboard/statCard";
import BusTableRow from "../../../components/dashboard/BusTableRow";
import BusDetailsCard from "../../../components/dashboard/BusDetailsCard";
import { Bus, BusStats } from "../../../types/type";
import Topsection from "@/components/dashboard/topsection";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";

const BusManagementDashboard: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<"All" | Bus["status"]>(
    "All"
  );

  const [stats] = useState<BusStats>({
    totalBuses: 150,
    activeBuses: 65,
    inMaintenance: 35,
    availableBuses: 50,
  });

  const [buses] = useState<Bus[]>(() =>
    Array.from({ length: 9 }, (_, index) => ({
      id: `bus-${index + 1}`,
      busNumber: "RAC 456 C",
      status: "Active" as const,
      route: "Kigali to Bujumbura",
      driver: {
        id: `driver-${index + 1}`,
        name: "Muhinde Doata",
        phone: "+250791154390",
      },
    }))
  );

  const filteredBuses = useMemo(() => {
    if (activeFilter === "All") return buses;
    return buses.filter((bus) => bus.status === activeFilter);
  }, [buses, activeFilter]);

  const selectedBus = useMemo(() => buses[0], [buses]);

  const handleAddBus = useCallback(() => {
    console.log("Add new bus");
  }, []);

  const handleEditBus = useCallback((bus: Bus) => {
    console.log("Edit bus:", bus);
  }, []);

  const handleDeleteBus = useCallback((busId: string) => {
    console.log("Delete bus:", busId);
  }, []);

  return (
    <div className="px-6 bg-gray-50 min-h-screen">
      <Topsection />
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Buses"
            value={stats.totalBuses}
            description="Full fleet size for operations"
            color="green"
          />
          <StatsCard
            title="Active Buses"
            value={stats.activeBuses}
            description="Buses currently in service"
            color="blue"
          />
          <StatsCard
            title="In Maintenance"
            value={stats.inMaintenance}
            description="Buses in repair or check-up"
            color="orange"
          />
          <StatsCard
            title="Available Buses"
            value={stats.availableBuses}
            description="Ready for schedule assignment"
            color="teal"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-1">
                  Bus List
                </h2>
                <p className="text-sm text-gray-500">
                  Showing {filteredBuses.length} of {buses.length} buses
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleAddBus}
                  className="flex items-center gap-2 bg-[#1EA17E] text-white px-4 py-2 rounded-full hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
                  aria-label="Add new route"
                >
                  <Plus size={20} />
                  Add
                </button>

              
                 
                 <Select>
                <SelectTrigger className="w-full  border border-green-300 p-2 sm:p-3 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500">
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Active</SelectItem>
                  <SelectItem value="dark">Retired</SelectItem>
                  <SelectItem value="white">In Maintenance</SelectItem>
                  <SelectItem value="yellow">Availabe</SelectItem>
                </SelectContent>
              </Select>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">
                        Bus number
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">
                        Status
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">
                        Route
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">
                        Driver
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBuses.map((bus, index) => (
                      <BusTableRow
                        key={bus.id}
                        bus={bus}
                        index={index}
                        onEdit={handleEditBus}
                        onDelete={handleDeleteBus}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <BusDetailsCard
              bus={selectedBus}
              totalSeats={50}
              availableSeats={8}
              route={{
                from: "Kigali",
                to: "Uganda",
                departure: "10:00 am",
                arrival: "12:00 am",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusManagementDashboard;
