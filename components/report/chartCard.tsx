import { BarChart3 } from "lucide-react";

type ChartCardProps = {
  title: string;
  children: React.ReactNode;
  className?: string;
  action?: React.ReactNode;
};

const ChartCard: React.FC<ChartCardProps> = ({
  title,
  children,
  className = "",
  action,
}) => (
  <div
    className={`bg-white rounded-xl shadow-sm border border-gray-200 p-10 transition-shadow duration-300 ${className}`}
  >
    <div className="flex items-center justify-between mb-6">
      <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
        <BarChart3 className="w-5 h-5 text-green-600" />
        
        {title}
      </h3>
      {action && <div className="flex items-center">{action}</div>}
    </div>
    {children}
  </div>
);

export default ChartCard;