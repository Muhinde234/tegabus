'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { Edit2, Trash2, Plus, ChevronDown, MoreHorizontal, Users, Car } from 'lucide-react';
import Image from 'next/image';
import bus from "../../../public/images/bus.png"

// Types
interface Driver {
  id: string;
  name: string;
  phone: string;
  avatar?: string;
}

interface Bus {
  id: string;
  busNumber: string;
  status: 'Active' | 'Inactive' | 'Maintenance';
  route: string;
  driver: Driver;
}

interface BusStats {
  totalBuses: number;
  activeBuses: number;
  inMaintenance: number;
  availableBuses: number;
}

interface BusDetailsCardProps {
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

// Components
const StatsCard: React.FC<{
  title: string;
  value: number;
  description: string;
  color: 'green' | 'blue' | 'orange' | 'teal';
}> = ({ title, value, description, color }) => {
  const colorClasses = {
    green: 'bg-green-500',
    blue: 'bg-blue-500', 
    orange: 'bg-orange-500',
    teal: 'bg-teal-500'
  };

  return (
    <div className={`${colorClasses[color]} text-white p-6 rounded-lg relative overflow-hidden`}>
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-white/90 text-sm font-medium">{title}</h3>
        <button className="text-white/80 hover:text-white">
          <MoreHorizontal size={16} />
        </button>
      </div>
      <div className="mb-1">
        <span className="text-3xl font-bold">{value}</span>
      </div>
      <p className="text-white/80 text-sm">{description}</p>
    </div>
  );
};

const StatusBadge: React.FC<{ status: Bus['status'] }> = ({ status }) => {
  const getStatusClass = (status: Bus['status']) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800 border border-green-200';
      case 'Inactive':
        return 'bg-gray-100 text-gray-800 border border-gray-200';
      case 'Maintenance':
        return 'bg-orange-100 text-orange-800 border border-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 border border-gray-200';
    }
  };

  return (
    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getStatusClass(status)}`}>
      {status}
    </span>
  );
};

const DriverInfo: React.FC<{ driver: Driver }> = ({ driver }) => (
  <div className="flex items-center gap-3">
    <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center flex-shrink-0">
      {driver.avatar ? (
        <img 
          src={driver.avatar} 
          alt={driver.name}
          className="w-full h-full object-cover rounded-full"
        />
      ) : (
        <span className="text-white text-xs font-medium">
          {driver.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
        </span>
      )}
    </div>
    <div className="min-w-0">
      <div className="font-medium text-gray-900 truncate">{driver.name}</div>
      <div className="text-sm text-gray-500">{driver.phone}</div>
    </div>
  </div>
);

const ActionButton: React.FC<{
  onClick: () => void;
  variant: 'edit' | 'delete';
  'aria-label': string;
}> = ({ onClick, variant, 'aria-label': ariaLabel }) => {
  const baseClasses = "p-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variantClasses = {
    edit: "text-gray-600 hover:text-blue-600 hover:bg-blue-50 focus:ring-blue-500",
    delete: "text-gray-600 hover:text-red-600 hover:bg-red-50 focus:ring-red-500"
  };

  const Icon = variant === 'edit' ? Edit2 : Trash2;

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]}`}
      aria-label={ariaLabel}
    >
      <Icon size={16} />
    </button>
  );
};

const BusDetailsCard: React.FC<BusDetailsCardProps> = ({ 
  bus, 
  totalSeats, 
  availableSeats, 
  route 
}) => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
 
    <div className="h-48 bg-gradient-to-br from-blue-50 to-blue-100 relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-32 h-20 bg-blue-600 rounded-lg flex items-center justify-center">
         <Image
           src="bus"
         alt="Bus Image"
          width={200}
          height={200}
        
         />
        </div>
      </div>
    </div>

    <div className="p-4">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-gray-900">{bus.busNumber}</h3>
         />
        </div>
      </div>
    </div>

 
    <div className="p-4">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-gray-900">{bus.busNumber}</h3>
        <StatusBadge status={bus.status} />
      </div>

   
      <div className="mb-4">
        <DriverInfo driver={bus.driver} />
      </div>

    
      <div className="flex gap-4 mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Users size={16} />
          <span>Total seats</span>
          <span className="font-medium text-gray-900">{totalSeats}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Users size={16} />
          <span>Available seats</span>
          <span className="font-medium text-gray-900">{availableSeats}</span>
        </div>
      </div>

    
      <div className="border-t border-gray-100 pt-3">
        <div className="text-sm font-medium text-gray-900 mb-1">
          {route.from} - {route.to}
        </div>
        <div className="flex justify-between text-sm text-gray-500">
          <span>Departure: {route.departure}</span>
          <span>Arrival: {route.arrival}</span>
        </div>
      </div>


      <div className="mt-4 h-32 bg-gray-100 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-400 mb-1">🗺️</div>
          <div className="text-sm text-gray-500">MAP COMING SOON</div>
        </div>
      </div>
    </div>
  </div>
);

const BusTableRow: React.FC<{
  bus: Bus;
  index: number;
  onEdit: (bus: Bus) => void;
  onDelete: (busId: string) => void;
}> = ({ bus, index, onEdit, onDelete }) => {
  const handleEdit = useCallback(() => onEdit(bus), [bus, onEdit]);
  const handleDelete = useCallback(() => onDelete(bus.id), [bus.id, onDelete]);

  return (
    <tr className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
      index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'
    }`}>
      <td className="py-4 px-4 font-medium text-gray-900">{bus.busNumber}</td>
      <td className="py-4 px-4">
        <StatusBadge status={bus.status} />
      </td>
      <td className="py-4 px-4 text-gray-700">{bus.route}</td>
      <td className="py-4 px-4">
        <DriverInfo driver={bus.driver} />
      </td>
      <td className="py-4 px-4">
        <div className="flex gap-2">
          <ActionButton
            onClick={handleEdit}
            variant="edit"
            aria-label={`Edit bus ${bus.busNumber}`}
          />
          <ActionButton
            onClick={handleDelete}
            variant="delete"
            aria-label={`Delete bus ${bus.busNumber}`}
          />
        </div>
      </td>
    </tr>
  );
};


const BusManagementDashboard: React.FC = () => {
 
  const [activeFilter, setActiveFilter] = useState<'All' | Bus['status']>('All');
  
  const [stats] = useState<BusStats>({
    totalBuses: 150,
    activeBuses: 65,
    inMaintenance: 35,
    availableBuses: 50
  });

  const [buses] = useState<Bus[]>(() => 
    Array.from({ length: 9 }, (_, index) => ({
      id: `bus-${index + 1}`,
      busNumber: 'RAC 456 C',
      status: 'Active' as const,
      route: 'Kigali to Bujumbura',
      driver: {
        id: `driver-${index + 1}`,
        name: 'Muhinde Doata',
        phone: '+250791154390'
      }
    }))
  );


  const filteredBuses = useMemo(() => {
    if (activeFilter === 'All') return buses;
    return buses.filter(bus => bus.status === activeFilter);
  }, [buses, activeFilter]);

  const selectedBus = useMemo(() => buses[0], [buses]);

  // Event handlers
  const handleAddBus = useCallback(() => {
    console.log('Add new bus');
  }, []);

  const handleEditBus = useCallback((bus: Bus) => {
    console.log('Edit bus:', bus);
  }, []);

  const handleDeleteBus = useCallback((busId: string) => {
    console.log('Delete bus:', busId);
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
      
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
                <h2 className="text-xl font-semibold text-gray-900 mb-1">Bus List</h2>
                <p className="text-sm text-gray-500">Showing {filteredBuses.length} of {buses.length} buses</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleAddBus}
                  className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
                >
                  <Plus size={20} />
                  Add
                </button>
                <button className="flex items-center gap-2 bg-white text-gray-700 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">
                  {activeFilter}
                  <ChevronDown size={16} />
                </button>
              </div>
            </div>

          
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Bus number</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Route</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Driver</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Action</th>
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
                from: 'Kigali',
                to: 'Uganda',
                departure: '10:00 am',
                arrival: '12:00 am'
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusManagementDashboard;