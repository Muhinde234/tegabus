import type { LucideIcon } from "lucide-react";

interface TermsCardProps {
  icon: LucideIcon;
  title: string;
  content: string;
}

const TermsCard: React.FC<TermsCardProps> = ({ icon: Icon, title, content }) => {
  return (
    <div className="max-w-md w-full mx-auto p-6 border border-[#0B3B2E] rounded-lg shadow-sm bg-white">
      <div className="flex items-center justify-center mb-4">
        <div className="border border-lime-400 rounded-full w-14 h-14 flex items-center justify-center">
          <Icon size={28} className="text-lime-400" />
        </div>
      </div>

      <div className="text-center">
        <h3 className="font-semibold text-lg text-[#0B3B2E] mb-3">{title}</h3>
        <p className="text-gray-700  leading-relaxed">{content}</p>
      </div>
    </div>
  );
};

export default TermsCard;
