import type { LucideIcon } from "lucide-react";
interface CardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const Card: React.FC<CardProps> = ({ icon: Icon, title, description }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-8 ">
      <div className="flex items-center justify-center mb-5  border border-lime-600  rounded-full w-22 h-22 ">
        <Icon size={50} className="text-lime-400 transition-all duration-200 hover:text-lime-500 hover:scale-110" />
      </div>

      <div className=" p-8 flex flex-col items-center justify-center ">
        <div className="flex gap-5 ">
          <p className="font-bold text-xl mb-5">{title}</p>
        </div>
        <div>
          <p className="text-lg text-center">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
