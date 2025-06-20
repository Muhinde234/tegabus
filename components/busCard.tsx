import { Ticket } from 'lucide-react';

interface BusCardProps {
  route: string;
  price: string;
  date: string;
  seatsLeft: number;
  departure: string;
  arrival: string;
  depTime: string;
  arrTime: string;
}

const BusCard: React.FC<BusCardProps> = ({
  route,
  price,
  date,
  seatsLeft,
  departure,
  arrival,
  depTime,
  arrTime,
}) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 w-full max-w-xs border border-[#0B3B2E]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Ticket className="bg-[#0B3B2E] text-white w-8 h-8 p-1 rounded-lg" />
          <span className="font-semibold text-gray-700">{route}</span>
        </div>
        <span className="font-semibold text-gray-800">{price}</span>
      </div>
     <div className='flex justify-between items-center'>
       <div className="text-sm text-gray-500 mt-1">{date}</div>

      <div className="mt-2 text-xs bg-green-100 text-green-700 w-fit px-2 py-0.5 rounded-full">
        {seatsLeft} seats left
      </div>

     </div>
     
      <div className=' mt-2 border border-dashed border-[#0B3B2E]'></div>

      <div className="flex justify-between mt-4 text-sm text-gray-600">
        <div className="text-center">
          <p>{departure}</p>
          <p className="text-lg font-medium">{depTime}</p>
        </div>
        <div className="text-center">
          <p>{arrival}</p>
          <p className="text-lg font-medium">{arrTime}</p>
        </div>
      </div>
    </div>
  );
};

export default BusCard;
