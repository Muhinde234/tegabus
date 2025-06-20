"use client";

import { useState } from "react";
import { MapPin, Filter, X, Loader2 } from "lucide-react";
import Link from "next/link";
import Button from "@/components/ui/button";
import BusCard from "@/components/busCard";
import Container from "@/components/ui/container";
import BusCompanyCard from "@/components/BusCompanyCard";
import { busData, popularRoutes } from "@/helpers/data";
import busCompanies from "../../../helpers/companies";

const RoutesPage = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(false);
 

  const handleSearch = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <div className="min-h-screen">
      <div className="bg-[#0B3B2E] p-6 text-white pt-42">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl text-center font-bold mb-6">
            Find Your Perfect Bus
          </h1>

          <div className="bg-white p-5 rounded-lg grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="From"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="w-full p-3 border border-[#0B3B2E] rounded text-gray-800"
              />
              <MapPin className="absolute right-3 top-3.5 text-gray-500" />
            </div>

            <div className="relative">
              <input
                type="text"
                placeholder="To"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="w-full p-3 border border-[#0B3B2E] rounded text-gray-800"
              />
              <MapPin className="absolute right-3 top-3.5 text-gray-500" />
            </div>

            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="p-3 border border-[#0B3B2E] rounded text-gray-800"
            />

            <button
              onClick={handleSearch}
              disabled={loading}
              className="bg-[#0B3B2E] hover:bg-green-600 text-white font-bold py-3 px-6 rounded flex items-center justify-center"
            >
              {loading ? <Loader2 className="animate-spin" /> : "Search Buses"}
            </button>
          </div>

          <div className="flex items-center justify-between">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center text-sm text-lime-300"
            >
              <Filter size={16} className="mr-1" />
              {showFilters ? "Hide Bus Companies" : "Show Bus Companies"}
            </button>
          </div>
        </div>
      </div>

      {showFilters && (
        <div className="border border-[#0B3B2E] p-4 shadow-sm">
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

      <h1 className="mt-32 mb-8 text-3xl font-bold text-center text-[#0B3B2E]">
        Available Buses
      </h1>
      <Container>
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 justify-items-center">
          {busData.map((data, index) => (
            <BusCard key={index} {...data} />
          ))}
        </div>
      </Container>

      <div className="max-w-7xl mx-auto p-8">
        <h2 className="text-3xl font-bold text-[#0B3B2E] text-center mb-4">
          Popular Routes
        </h2>
        <div className="mb-8 bg-gradient-to-r from-[#0B3B2E] to-lime-700 rounded-md">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-8">
            {popularRoutes.map((route, index) => (
              <div key={index}>
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-bold text-white text-lg">
                      {route.from} --- {route.to}
                    </h3>
                    <p className="text-black">{route.buses}+ buses daily</p>
                  </div>
                  <Button>
                    <Link href="/">view schedules</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoutesPage;
