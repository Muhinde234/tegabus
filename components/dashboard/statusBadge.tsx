import React from 'react';
import { Bus } from '@/types/type';

interface StatusBadgeProps {
  status: Bus['status'];
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
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

export default StatusBadge;