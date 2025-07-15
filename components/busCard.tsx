import {Ticket} from 'lucide-react';
import Link from 'next/link';
import {ScheduleResponse} from "@/lib/types";
import {formatReadableDate, formatTimeOnly} from "@/lib/utils";



const BusCard = ({ticket}: {ticket: ScheduleResponse}) => {
    return (
        <Link href={`/schedule/${ticket.id}`} className="min-w-xs">
            <div className="bg-white border border-gray-300  rounded-lg shadow-md p-4 w-full">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Ticket className="bg-[#0B3B2E] text-white w-8 h-8 p-1 rounded-lg"/>
                        <span className="font-semibold text-gray-700">{ticket.bus}</span>
                    </div>
                    <span className="font-semibold text-gray-800">{ticket.price} Rwf</span>
                </div>
                <div className='flex justify-between items-center'>
                    <div className="text-sm text-gray-500 mt-1">{formatReadableDate(ticket.departureTime)}</div>

                    <div className="mt-2 text-xs bg-green-100 text-green-700 w-fit px-2 py-0.5 rounded-full">
                        {ticket.remainingSeats} seats left
                    </div>

                </div>

                <div className=' mt-2 border border-dashed border-[#0B3B2E]'></div>

                <div className="flex justify-between mt-4 text-sm text-gray-600">
                    <div className="text-center">
                        <p>{ticket.from}</p>
                        <p className="text-lg font-medium">{formatTimeOnly(ticket.departureTime)}</p>
                    </div>
                    <div className="text-center">
                        <p>{ticket.to}</p>
                        <p className="text-lg font-medium">{formatTimeOnly(ticket.arrivalTime)}</p>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default BusCard;
