"use client";

import {useEffect, useState} from "react";
import Image from "next/image";
import {useTranslations} from "next-intl";
import {Filter, Loader2, MapPin, X} from "lucide-react";
import {Button} from "@/components/ui/button";
import BusCard from "@/components/busCard";
import Container from "@/components/ui/container";
import BusCompanyCard from "@/components/BusCompanyCard";
import busCompanies from "../../../../helpers/companies";
import {Input} from "@/components/ui/inputField";
import PopularRoutesSection from "@/components/popularRoute";
import {useSchedules} from "@/hooks/useSchedule";
import {useEndLocation, useStartLocation} from "@/hooks/useRoutes";
import {useRouter, useSearchParams} from "next/navigation";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import routeImage from "../../../../public/images/about.png";


const RoutesPage = () => {
  const t = useTranslations("routes");
  const router = useRouter();
  const searchParams = useSearchParams();

  const [from, setFrom] = useState(searchParams.get("from") || "");
  const [to, setTo] = useState(searchParams.get("to") || "");
  const [date, setDate] = useState(searchParams.get("departureDate") || "");

  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(false);

  const { data: origins = [], isLoading: originsLoading } = useStartLocation();
  const { data: destinations = [], isLoading: destinationsLoading } = useEndLocation(from);
  const { data: schedules = [], isLoading: schedulesLoading } = useSchedules({ from, to, departureDate: date });


  const handleSearch = () => {
    const params = new URLSearchParams();
    if (from) params.set("from", from);
    if (to) params.set("to", to);
    if (date) params.set("departureDate", date);

    router.push(`/route?${params.toString()}`);
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  };

  useEffect(() => {
    setTo("");
  }, [from]);



  return (
      <div className="min-h-screen bg-gray-50">
        <section className="relative isolate -mt-20 overflow-hidden bg-[#0B3B2E] pt-20 text-white md:-mt-24  md:pt-24">
          <div className="absolute inset-0">
            <Image
              src={routeImage}
              alt="Routes background"
              fill
              priority
              className="object-cover object-center opacity-30"
            />
          </div>

          <div className="absolute inset-0 bg-linear-to-b from-[#0B3B2E]/95 via-[#0B3B2E]/85 to-[#0B3B2E]/95" />

          <div className="relative z-10 mx-auto  min-h-135 max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
            <h1 className="text-3xl text-center font-bold mb-6">{t("pageTitle")}</h1>
            <p className="mx-auto mb-8 max-w-3xl text-center text-base leading-7 text-white/85 sm:text-lg">
              {t("pageDescription")}
            </p>

            <div className="bg-white border border-gray-400 p-5 rounded-lg grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div className="relative">
                <Select
                    value={from}
                    onValueChange={(value) => setFrom(value)}
                >
                  <SelectTrigger className="w-full capitalize p-3 border rounded text-gray-800">
                    <SelectValue placeholder={t("search.from")} />
                  </SelectTrigger>
                  <SelectContent>
                    {origins.map((origin, idx) => (
                        <SelectItem className="capitalize" key={idx} value={origin}>
                          {origin}
                        </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <MapPin size={20} className="absolute right-3 top-2 text-gray-500" />
              </div>

              <div className="relative">
                <Select
                    value={to}
                    onValueChange={(value) => setTo(value)}
                    disabled={!from}
                >
                  <SelectTrigger className="w-full capitalize p-3 border  rounded text-gray-800">
                    <SelectValue placeholder={t("search.to")} />
                  </SelectTrigger>
                  <SelectContent>
                    {destinations.map((dest, idx) => (
                        <SelectItem className="capitalize" key={idx} value={dest}>
                          {dest}
                        </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <MapPin size={20} className="absolute right-3 top-2 text-gray-500" />
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
        </section>

        {showFilters && (
            <div className="border border-gray-300 rounded-lg shadow-md p-2">
              <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-[#0B3B2E] text-center text-xl">{t("busCompanies.title")}</h3>
                  <button onClick={() => setShowFilters(false)}>
                    <X className="text-gray-500" />
                  </button>
                </div>

                <div className="flex flex-wrap justify-center gap-6 mt-8">
                  {/* Assuming busCompanies is static */}
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
            {schedules.map((schedule, idx) => (
                <BusCard key={idx} ticket={schedule} />
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