import {  Ellipsis } from "lucide-react";
import React, { ReactNode } from "react";

type CardColor = "blue" | "green" | "orange" | "purple" | "red";

interface DashboardCardProps {
  title: string;
  value: string;
  description?: ReactNode;
  color?: CardColor;
  icon?: ReactNode;
  image?: ReactNode;
}

const colorVariants: Record<CardColor, { 
  bg: string; 
  text: string; 
  value: string; 
  border: string 
}> = {
  blue: {
    bg: 'bg-gradient-to-r from-[#1EA17E] to-[#0B3B2E]',
    text: 'text-white',
    value: 'text-white',
    border: 'border-none'
  },
  green: {
    bg: 'bg-gradient-to-r from-[#0B3B2E] to-[#1EA17E]',
    text: 'text-white',
    value: 'text-white',
    border: 'border-none'
  },
  orange: {
    bg: 'bg-gradient-to-r from-[#0B3B2E] to-[#1EA17E]',
    text: 'text-white',
    value: 'text-white',
    border: 'border-none'
  },
  purple: {
    bg: 'bg-gradient-to-r from-[##0B3B2E] to-[#1EA17E]',
    text: 'text-white',
    value: 'text-white',
    border: 'border-none'
  },
  red: {
    bg: 'bg-gradient-to-r from-[##0B3B2E] to-[#1EA17E]',
    text: 'text-white',
    value: 'text-white',
    border: 'border-none'
  },
};

const DashboardCard: React.FC<DashboardCardProps> = ({ 
  title, 
  value, 
  description, 
  color = "blue", 
  icon, 
  image 
}) => {
  const variant = colorVariants[color];

  return (
    <div className={`relative rounded-lg p-6 flex flex-col border ${variant.bg} ${variant.border}`}>
      <div className="flex justify-between">
        <h3 className={`text-sm font-medium uppercase tracking-wider ${variant.text}`}>
          {title}
        </h3>
        <Ellipsis size={24} className="text-white" />
      </div>
      
      <p className={`mt-2 text-3xl font-semibold ${variant.value}`}>
        {value}
      </p>
      
      {description && (
        <div className="flex gap-1">
          <p className={`mt-1 text-sm ${variant.text}`}>
            {description}
          </p>
          {icon}
        </div>
      )}
      
      {image && (
        <div className="absolute bottom-0 right-2">
          {image}
        </div>
      )}
    </div>
  );
};

export default DashboardCard;