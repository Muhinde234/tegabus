import React from 'react';
import Image from 'next/image';
import {  BusFront } from 'lucide-react';
import { BusDetailsCardProps } from '../../types/type';
import StatusBadge from '../dashboard/statusBadge';
import DriverInfo from './DriverInfo';
import Map from "@/components/dashboard/map";


const DEFAULT_CENTER: [number, number] = [-1.9499500, 30.0588500]

const BusDetailsCard: React.FC<BusDetailsCardProps> = ({ 
  bus, 
  totalSeats, 
  availableSeats, 
  route 
}) => (
  <div className="w-110 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
 
    <div className="h-100  relative ">
      <Image
        src="/images/bus.png"
        alt="Bus Image"
        fill
        className="object-fit"
        quality={100}
      />
    
      <div className="absolute inset-0 flex items-center justify-center bg-black/10">
        <div className="bg-white/90 p-2 rounded-lg shadow-sm">
          <span className="font-medium text-gray-900">{bus.busNumber}</span>
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

     <div className="flex justify-around gap-4 mb-4">
 
  <div className="flex flex-col  p-4 border border-gray-300 rounded-lg bg-white min-w-[140px]">
    <div className="flex items-center gap-2 mb-2">
      <BusFront size={20} className="text-gray-700" />
      <span className="text-sm text-gray-600">Total seats</span>
    </div>
    <span className="text-2xl font-bold text-gray-900">{totalSeats}</span>
  </div>
  
 
  <div className="flex flex-col p-4 border border-gray-300 rounded-lg bg-white min-w-[140px]">
    <div className="flex items-center gap-2 mb-2">
      <BusFront size={20} className="text-gray-700" />
      <span className="text-sm text-gray-600">Available seats</span>
    </div>
    <span className="text-2xl font-bold text-green-600">{availableSeats}</span>
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

    
     <div className="border border-gray-200 flex justify-center items-center h-full">
                   <Map width={500} height={200} center={DEFAULT_CENTER} zoom={6} className="rounded-lg" />
          
                   </div>
      
    </div>
  </div>
);

export default BusDetailsCard;