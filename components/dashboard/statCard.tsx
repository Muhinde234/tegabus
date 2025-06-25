import React from 'react';
import { MoreHorizontal } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: number;
  description: string;
  color: 'green' | 'blue' | 'orange' | 'teal';
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, description, color }) => {
  const colorClasses = {
    green: 'bg-gradient-to-r from-[#1EA17E] to-[#0B3B2E]',
    blue: 'bg-gradient-to-r from-[#0B3B2E] to-[#1EA17E]', 
    orange: 'bg-gradient-to-r from-[#0B3B2E] to-[#1EA17E]',
    teal: 'bg-gradient-to-r from-[#0B3B2E] to-[#1EA17E]'
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

export default StatsCard;