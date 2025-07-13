"use client";

import { useState} from "react";
import { useTranslations } from "next-intl";
import { MapPin, Filter, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import BusCard from "@/components/busCard";
import Container from "@/components/ui/container";
import BusCompanyCard from "@/components/BusCompanyCard";
import { busData } from "@/helpers/data";
import busCompanies from "../../../../helpers/companies";
import { Input } from "@/components/ui/inputField";
import PopularRoutesSection from "@/components/popularRoute";


const RoutesPage = () => {
  const t = useTranslations("routes");
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
    <div className="min-h-screen ">
      <div className="bg-[#0B3B2E] p-6 text-white pt-42">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl text-center font-bold mb-6">
            {t("pageTitle")}
          </h1>

          <div className="bg-white border border-gray-400 p-5 rounded-lg grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div className="relative">
              <Input
                type="text"
                placeholder={t("search.from")}
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded text-gray-800"
              />
              <MapPin className="absolute right-3 top-2 text-gray-500" />
            </div>

            <div className="relative">
              <Input
                type="text"
                placeholder={t("search.to")}
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
              {loading ? <Loader2 className="animate-spin" /> : t("search.searchButton")}
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <Button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center text-sm text-lime-300 cursor-pointer"
            >
              <Filter size={16} className="mr-1" />
              {showFilters ? t("search.hideFilters") : t("search.showFilters")}
            </Button>
          </div>
        </div>
      </div>

      {showFilters && (
        <div className="border border-gray-300  rounded-lg shadow-md p-2">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-[#0B3B2E] text-center text-xl">
                {t("busCompanies.title")}
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
        {t("availableBuses.title")}
      </h1>
      <Container>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 justify-items-center">
          {busData.map((data, index) => (
            <BusCard key={index} {...data} />
          ))}
        </div>
        <div className="p-4">
        <PopularRoutesSection />
        </div>
        
      </Container>
    </div>
  );
};




export default RoutesPage;