import React from 'react';
import { Driver } from '../../types/type';

interface DriverInfoProps {
  driver: Driver;
}

const DriverInfo: React.FC<DriverInfoProps> = ({ driver }) => (
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

export default DriverInfo;