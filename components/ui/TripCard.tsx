import { Star } from "lucide-react";

interface tripProps{
    trips: any;
    rating: any;
    departures: any;
}


const TripCard:React.FC<tripProps>= ({ trips, rating, departures }) => {
  return (
    <div className="">
      <div className="container mt-18 mx-auto  md:m-w-7xl p-6">
      <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
        <div className="text-center flex  gap-2">
          <p className="text-5xl font-bold ">{trips}</p>
          <p className="text-black mt-2">Safe Trips</p>
        </div>
        <div className="text-center">
          <div className="flex gap-2 justify-center items-center">
            <p className="text-5xl font-bold  mr-2">{rating}</p>
            <div className="flex ">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-6 h-6 text-lime-400"
                  fill="currentColor"
                />
              ))}
            </div>
          </div>
          <p className="ml-18 text-black">Customer Ratings</p>
        </div>
        <div className="text-center flex">
          <p className="text-5xl font-bold   border-r border-gray-400 p-2">
            {departures}
          </p>
          <p className="text-black p-3">On-Time Departures</p>
        </div>
      </div>
    </div>

    </div>
    
  );
};

export default TripCard;
