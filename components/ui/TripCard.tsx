"use client";

import { Star, Bus, CheckCircle2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";

interface tripProps {
  trips: any;
  rating: any;
  departures: any;
}

// Counter Animation Component
const AnimatedCounter: React.FC<{ value: string | number; duration?: number }> = ({
  value,
  duration = 2000,
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  const numericValue = parseFloat(value.toString().replace(/[^0-9.]/g, ""));

  useEffect(() => {
    let animationFrameId: number;
    let elapsed = 0;

    const animate = (deltaTime: number) => {
      elapsed += deltaTime;
      const progress = (elapsed % duration) / duration;

      setDisplayValue(Math.floor(progress * numericValue * 10) / 10);

      animationFrameId = requestAnimationFrame(animate);
    };

    let lastTime = Date.now();
    animationFrameId = requestAnimationFrame(() => {
      const currentTime = Date.now();
      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;
      animate(deltaTime);
    });

    return () => cancelAnimationFrame(animationFrameId);
  }, [numericValue, duration]);

  const originalValue = value.toString();
  const hasK = originalValue.includes("K");
  const hasPlus = originalValue.includes("+");
  const displayText =
    displayValue.toString() + (hasK ? "K" : "") + (hasPlus ? "+" : "");

  return <span>{displayText}</span>;
};

const TripCard: React.FC<tripProps> = ({ trips, rating, departures }) => {
  const t = useTranslations("hero");

  return (
    <div className="w-full py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 rounded-3xl overflow-hidden">
        
        {/* Safe Trips */}
        <div className="flex flex-col items-center justify-center gap-4 py-12 px-8 rounded-2xl shadow-lg">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center">
            <Bus className="w-12 h-12 text-lime-600" />
          </div>
          <div className="text-center">
            <p className="text-5xl md:text-6xl font-bold text-gray-900 tracking-tight">
              <AnimatedCounter value={trips} duration={8000} />
            </p>
            <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider mt-2">
              {t("safe_trips")}
            </p>
          </div>
        </div>

        {/* Customer Rating */}
        <div className="flex flex-col items-center justify-center gap-4 py-12 px-8 rounded-2xl shadow-lg">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="w-6 h-6 text-amber-500"
                fill="currentColor"
              />
            ))}
          </div>
          <div className="text-center">
            <p className="text-5xl md:text-6xl font-bold text-gray-900 tracking-tight">
              <AnimatedCounter value={rating} duration={8000} />
            </p>
            <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider mt-2">
              {t("customer_ratings")}
            </p>
          </div>
        </div>

        
        <div className="flex flex-col items-center justify-center gap-4 py-12 px-8 rounded-2xl shadow-lg">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center">
            <CheckCircle2 className="w-12 h-12 text-lime-600" />
          </div>
          <div className="text-center">
            <p className="text-5xl md:text-6xl font-bold text-gray-900 tracking-tight">
              <AnimatedCounter value={departures} duration={8000} />
            </p>
            <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider mt-2">
              {t("on_time_departures")}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TripCard;
