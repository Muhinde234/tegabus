"use client";

import { useState, useEffect } from "react";
import { MapPin, Filter, X, Loader2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import BusCard from "@/components/busCard";
import Container from "@/components/ui/container";
import BusCompanyCard from "@/components/BusCompanyCard";
import { busData, popularRoutes } from "@/helpers/data";
import busCompanies from "../../../helpers/companies";
import { Input } from "@/components/ui/inputField";
import Loader from "@/components/ui/loader";

const RoutesPage = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
   
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500); 
    
    return () => clearTimeout(timer);
  }, []);

  const handleSearch = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  };

  if (isLoading) return <Loader />;

  return (
    <div className="min-h-screen">
      <div className="bg-[#0B3B2E] p-6 text-white pt-42">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl text-center font-bold mb-6">
            Find Your Perfect Bus
          </h1>

          <div className="bg-white border border-gray-400 p-5 rounded-lg grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div className="relative">
              <Input
                type="text"
                placeholder="From"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded text-gray-800"
              />
              <MapPin className="absolute right-3 top-2 text-gray-500" />
            </div>

            <div className="relative">
              <Input
                type="text"
                placeholder="To"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded text-gray-800"
              />
              <MapPin className="absolute right-3 top-2 text-gray-500" />
            </div>

            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="p-3 border border-gray-300 rounded text-gray-800"
            />

            <Button
              variant="ghost"
              onClick={handleSearch}
              disabled={loading}
              className="bg-[#0B3B2E] hover:bg-green-600 text-white font-bold py-3 px-6 rounded flex items-center justify-center cursor-pointer"
            >
              {loading ? <Loader2 className="animate-spin" /> : "Search Buses"}
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <Button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center text-sm text-lime-300 cursor-pointer"
            >
              <Filter size={16} className="mr-1" />
              {showFilters ? "Hide Bus Companies" : "Show Bus Companies"}
            </Button>
          </div>
        </div>
      </div>

      {showFilters && (
        <div className="border border-gray-300  rounded-lg shadow-md p-2">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-[#0B3B2E] text-center text-xl">
                Bus Companies
              </h3>
              <button onClick={() => setShowFilters(false)}>
                <X className="text-gray-500" />
              </button>
            </div>

            <div className="flex flex-wrap justify-center gap-6 mt-8">
              {busCompanies.map((company, index) => (
                <BusCompanyCard key={index} company={company} />
              ))}
            </div>
          </div>
        </div>
      )}

      <h1 className="mt-32 mb-8 text-2xl md:text-3xl font-bold text-center text-[#0B3B2E]">
        Available Buses
      </h1>
      <Container>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 justify-items-center">
          {busData.map((data, index) => (
            <BusCard key={index} {...data} />
          ))}
        </div>
        <div className="mt-16 sm:mt-20 md:mt-24">
            <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-10">
              Top Travel Routes
            </h2>
            <div className="mb-16 sm:mb-20 md:mb-24 bg-gradient-to-r from-[#0B3B2E] to-lime-700 rounded-xl shadow-lg overflow-hidden">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 p-4 sm:p-6 md:p-8">
                {popularRoutes.map((route, index) => (
                  <div key={index} className="bg-white/10 p-4 rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-bold text-white text-base sm:text-lg md:text-xl">
                          {route.from} — {route.to}
                        </h3>
                        <p className="text-lime-200 text-sm sm:text-base">
                          {route.buses}+ buses daily
                        </p>
                      </div>
                      <Button
                        variant="default"
                        className="bg-lime-400 hover:bg-lime-300 rounded-lg py-1 px-2 sm:py-2 sm:px-3 text-xs sm:text-sm"
                      >
                        <Link href="/route">View schedules</Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
      </Container>
    </div>
  );
};

export default RoutesPage;