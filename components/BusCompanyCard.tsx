"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { BusCompany } from "@/types/bus";
import { Button } from "./ui/button";
import { useTranslations } from "next-intl";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/Dialog";

interface Props {
  company: BusCompany;
  images?: string;
}

// Get destination photo based on city name
const getDestinationPhoto = (cityName: string): string => {
  const photoMap: Record<string, string> = {
    "Kigali": "/images/Kigali_city.jpeg",
    "Musanze": "/images/musanze.jpg",
    "Rubavu": "/images/rubavu.jpg",
    "Nyagatare": "/images/nyagatare.jpg",
    "Huye": "/images/huye.jpg",
    "Rusizi": "/images/rusizi.jpg",
    "Kibuye": "/images/kibuye.jpg",
    "Gisenyi": "/images/gisenyi.jpg",
    
  };
  return photoMap[cityName] || "/images/default-destination.jpg";
};

// Google Maps URL for the destination
const getGoogleMapsUrl = (cityName: string): string => {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(cityName + ", Rwanda")}`;
};

const BusCompanyCard: React.FC<Props> = ({ company, images }) => {
  const t = useTranslations("company");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState<any>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Map company names to their respective images
  const getCompanyImage = (companyName: string): string => {
    const imageMap: Record<string, string> = {
      "Ritco": "/images/rticobus.jpg",
      "Trinity": "/images/trinitybus.jpg",
      "Horizon": "/images/horizonbus.jpg",
    };
    
    return imageMap[companyName] || "/images/rticobus.jpg";
  };

  // Mock route data for each company
  const getCompanyRoutes = (companyName: string) => {
    const routesMap: Record<string, Array<{ id: string; from: string; to: string; price: string }>> = {
      "Ritco": [
        { id: "1", from: "Kigali", to: "Musanze", price: "3,000 RWF" },
        { id: "2", from: "Kigali", to: "Rubavu", price: "4,500 RWF" },
        { id: "3", from: "Musanze", to: "Kigali", price: "3,000 RWF" },
        { id: "4", from: "Kigali", to: "Nyagatare", price: "3,500 RWF" },
      ],
      "Trinity": [
        { id: "5", from: "Kigali", to: "Huye", price: "2,500 RWF" },
        { id: "6", from: "Kigali", to: "Nyagatare", price: "3,500 RWF" },
        { id: "7", from: "Huye", to: "Kigali", price: "2,500 RWF" },
        { id: "8", from: "Kigali", to: "Rusizi", price: "5,000 RWF" },
      ],
      "Horizon": [
        { id: "9", from: "Kigali", to: "Kibuye", price: "3,200 RWF" },
        { id: "10", from: "Kigali", to: "Rusizi", price: "5,000 RWF" },
        { id: "11", from: "Kibuye", to: "Kigali", price: "3,200 RWF" },
        { id: "12", from: "Kigali", to: "Gisenyi", price: "4,000 RWF" },
      ],
    };
    
    return routesMap[companyName] || [];
  };

  const handleViewRoutes = () => {
    setIsModalOpen(true);
    setSelectedRoute(null);
  };

  const handleRouteSelect = (route: any) => {
    setSelectedRoute(route);
  };

  const routes = getCompanyRoutes(company.name);

  // Handle click outside to close modal
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      document.addEventListener("keydown", handleEscKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [isModalOpen]);

  return (
    <>
      <div className="border border-gray-300 rounded-lg shadow-sm p-6 mb-3 w-full sm:w-[300px] hover:shadow-md transition-shadow duration-200">
        <div className="relative w-full h-40 mb-4 rounded-md overflow-hidden bg-gray-100">
          <Image
            src={images || getCompanyImage(company.name)}
            alt={`${company.name} bus`}
            fill
            className="object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>

        <h2 className="text-xl font-semibold text-[#0B3B2E] mb-2">{company.name}</h2>

        <p className="mb-4 text-gray-600">
          {t("buses_label", { count: company.numberOfBuses })}
        </p>

        <Button
          variant="default"
          onClick={handleViewRoutes}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 cursor-pointer w-full"
        >
          {t("view_routes")}
        </Button>
      </div>

      {/* AlertDialog Modal for Routes - Now closes when clicking outside */}
      <AlertDialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <AlertDialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto" ref={modalRef}>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl font-bold text-[#0B3B2E]">
              {company.name} - {t("available_routes")}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {t("select_route")}
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="mt-4 space-y-4">
            {routes.length > 0 ? (
              routes.map((route) => (
                <div
                  key={route.id}
                  className={`border rounded-lg p-4 transition-all cursor-pointer ${
                    selectedRoute?.id === route.id
                      ? "border-green-500 bg-green-50 shadow-md"
                      : "border-gray-200 hover:border-green-500 hover:bg-green-50"
                  }`}
                  onClick={() => handleRouteSelect(route)}
                >
                  <div className="flex gap-4">
                    {/* Destination Photo with View Map Button Overlay */}
                    <div className="relative w-36 h-28 rounded-lg overflow-hidden flex-shrink-0 shadow-md group">
                      <Image
                        src={getDestinationPhoto(route.to)}
                        alt={`${route.to} destination`}
                        fill
                        className="object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "/images/default-destination.jpg";
                        }}
                      />
                      {/* View Map Button Overlay - Green, No Icon */}
                      <a
                        href={getGoogleMapsUrl(route.to)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute inset-x-0 bottom-0 bg-green-600 text-white text-xs py-1.5 text-center hover:bg-green-700 transition-colors font-medium"
                        onClick={(e) => e.stopPropagation()}
                      >
                        View Map
                      </a>
                    </div>
                    
                    {/* Route Details */}
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-semibold text-lg">{route.from}</span>
                            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                            <span className="font-semibold text-lg text-green-700">{route.to}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-green-600">
                            {route.price}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                {t("no_routes_available")}
              </div>
            )}
          </div>

          <AlertDialogFooter className="mt-6">
            <AlertDialogCancel>
              {t("close")}
            </AlertDialogCancel>
            {selectedRoute && (
              <AlertDialogAction
                onClick={() => {
                  console.log("Proceed to book:", selectedRoute);
                  setIsModalOpen(false);
                }}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                {t("book_now")}
              </AlertDialogAction>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default BusCompanyCard;