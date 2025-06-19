import { Star } from "lucide-react";

interface tripProps{
    trips: any;
    rating: any;
    departures: any;
}


const TripCard:React.FC<tripProps>= ({ trips, rating, departures }) => {
  return (
    <div className="container mt-18 mx-auto  md:m-w-7xl p-6">
      <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
        <div className="text-center flex  gap-2">
          <p className="text-5xl font-bold text-gray-800">{trips}</p>
          <p className="text-gray-600 mt-2">Safe Trips</p>
        </div>
        <div className="text-center">
          <div className="flex gap-2 justify-center items-center">
            <p className="text-5xl font-bold text-gray-800 mr-2">{rating}</p>
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
          <p className="text-gray-600">Customer Ratings</p>
        </div>
        <div className="text-center flex">
          <p className="text-5xl font-bold text-gray-800  border-r border-gray-400 p-2">
            {departures}
          </p>
          <p className="text-gray-600 p-3">On-Time Departures</p>
        </div>
      </div>
    </div>
  );
};

export default TripCard;
