import {  TrendingUp } from "lucide-react";

type StatCardProps = {
  icon: React.ElementType;
  title: string;
  value: string | number;
  change: number;
  changeType?: "positive" | "negative";
};

const StatCard: React.FC<StatCardProps> = ({
  icon: Icon,
  title,
  value,
  change,
  changeType = "positive",
}) => (
  <div className="bg-gradient-to-r from-[#0B3B2E] to-[#1EA17E] rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
    <div className="flex items-center justify-between mb-4">
      <div
        className={`p-3 rounded-lg ${
          changeType === "positive"
            ? "bg-gradient-to-br from-green-50 to-green-100"
            : "bg-gradient-to-br from-blue-50 to-blue-100"
        }`}
      >
        <Icon
          className={`w-6 h-6 ${
            changeType === "positive" ? "text-green-700" : "text-blue-700"
          }`}
        />
      </div>
      <div
        className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
          changeType === "positive"
            ? "bg-green-100 text-green-700"
            : "bg-blue-100 text-blue-700"
        }`}
      >
        <TrendingUp className="w-3 h-3" />
        
        <span>+{change}%</span>
      </div>
    </div>
    <h3 className="text-black text-sm font-medium mb-1">{title}</h3>
    <p className="text-2xl font-bold text-black">{value}</p>
  </div>
);



export default StatCard