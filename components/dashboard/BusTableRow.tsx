import React from 'react';
import StatusBadge from './statusBadge';
import ActionButton from './ActionButton';
import {Bus} from "@/lib/types";

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
      <td className="py-4 px-4 font-medium text-gray-900">{bus.plateNumber}</td>
      <td className="py-4 px-4">
        <StatusBadge status="Active" />
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