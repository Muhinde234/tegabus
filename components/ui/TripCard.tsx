"use client";

import { Star } from "lucide-react";
import { useTranslations } from "next-intl";

interface tripProps {
  trips: any;
  rating: any;
  departures: any;
}

const TripCard: React.FC<tripProps> = ({ trips, rating, departures }) => {
  const t = useTranslations("hero");

  return (
    <div className=" container mx-auto w-full py-4 flex justify-center">
      <div className=" container max-w-9xl w-full grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-0 rounded-2xl overflow-hidden">
        
        {/* Safe Trips */}
        <div className="flex items-center justify-center  gap-4 md:gap-6 px-6 md:px-8 py-4 md:py-6 bg-white">
          <div>
            <p className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
              {trips}
            </p>
          </div>
          <div className="hidden md:block text-right">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
              {t("safe_trips")}
            </p>
          </div>
          <div className="md:hidden text-center">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
              {t("safe_trips")}
            </p>
          </div>
        </div>

        {/* Customer Rating */}
        <div className="flex items-center justify-center  gap-4 md:gap-6 px-6 md:px-8 py-4 md:py-6 bg-lime-50 md:bg-lime-50">
          <div className="flex flex-col items-center md:items-start gap-2">
            <p className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
              {rating}
            </p>
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 md:w-5 md:h-5 text-amber-500"
                  fill="currentColor"
                />
              ))}
            </div>
          </div>
          <div className="hidden md:block text-right">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
              {t("customer_ratings")}
            </p>
          </div>
          <div className="md:hidden text-center">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
              {t("customer_ratings")}
            </p>
          </div>
        </div>

        {/* On-time Departures */}
        <div className="flex items-center justify-center  gap-4 md:gap-6w px-6 md:px-8 py-4 md:py-6 bg-white">
          <div>
            <p className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
              {departures}
            </p>
          </div>
          <div className="hidden md:block text-right">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
              {t("on_time_departures")}
            </p>
          </div>
          <div className="md:hidden text-center">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
              {t("on_time_departures")}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TripCard;
