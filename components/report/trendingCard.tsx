import React from "react";
import { Bus, TrendingUp, CheckCircle } from "lucide-react";

interface TrendingCardProps {
  fleetUtilization?: number;
  activeBuses?: number;
  growthRate?: string;
  onTimePerformance?: string;
}

const TrendingCard: React.FC<TrendingCardProps> = ({
  fleetUtilization = 92,
  activeBuses = 120,
  growthRate = "+12%",
  onTimePerformance = "94.5%",
}) => {
  return (
    <div className="bg-white rounded-xl border border-gray-300 p-6 mt-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="text-center">
          <Bus className="w-8 h-8 text-green-600 mx-auto mb-2" />
          <h4 className="font-semibold text-gray-900">Fleet Utilization</h4>
          <p className="text-2xl font-bold text-green-600">{fleetUtilization}%</p>
          <p className="text-sm text-gray-600">{activeBuses} buses active</p>
        </div>
        <div className="text-center">
          <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
          <h4 className="font-semibold text-gray-900">Growth Rate</h4>
          <p className="text-2xl font-bold text-green-600">{growthRate}</p>
          <p className="text-sm text-gray-600">vs last month</p>
        </div>
        <div className="text-center">
          <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
          <h4 className="font-semibold text-gray-900">On-Time Performance</h4>
          <p className="text-2xl font-bold text-green-600">{onTimePerformance}</p>
          <p className="text-sm text-gray-600">above target</p>
        </div>
      </div>
    </div>
  );
};

export default TrendingCard;