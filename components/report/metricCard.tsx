import React from "react";

interface MetricProps {
  icon: React.ElementType;
  title: string;
  value: string | number;
  description: string;
  className?: string;
}

const MetricCard: React.FC<MetricProps> = ({ 
  icon: Icon, 
  title, 
  value, 
  description, 
  className = "" 
}) => (
  <div
    className={`bg-gradient-to-r from-[#1EA17E] to-[#0B3B2E] rounded-lg p-4 border border-gray-200 text-white ${className}`}
  >
    <div className="flex items-center gap-3 mb-3">
      <div className="p-2 bg-white/20 rounded-lg">
        <Icon className="w-5 h-5 text-white" />
      </div>
      <h4 className="font-semibold text-white">{title}</h4>
    </div>
    <p className="text-2xl font-bold text-white mb-1">{value}</p>
    <p className="text-sm text-white/80">{description}</p>
  </div>
);

export default MetricCard;