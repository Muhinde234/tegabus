import React from 'react';
import { Bus } from '@/types/type';
import StatusBadge from './statusBadge';
import DriverInfo from './DriverInfo';
import ActionButton from './ActionButton';

interface BusTableRowProps {
  bus: Bus;
  index: number;
  onEdit: (bus: Bus) => void;
  onDelete: (busId: string) => void;
}

const BusTableRow: React.FC<BusTableRowProps> = ({ bus, index }) => {


  return (
    <tr className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'
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
          <ActionButton />
        </div>
      </td>
    </tr>
  );
};

export default BusTableRow;