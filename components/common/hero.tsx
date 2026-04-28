"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import home from "./../../public/images/home.jpg";
import Container from "../ui/container";
import Link from "next/link";
import TripCard from "../ui/TripCard";
import CardSection from "../ui/cardSection";
import { Phone, ThumbsUp, MapPin, Calendar, Search } from "lucide-react";
import Contact from "../ui/contactForm";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/inputField";
import PopularRoutesSection from "../popularRoute";
import { useStartLocation, useEndLocation } from "@/hooks/useRoutes";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const Hero = () => {
  const t = useTranslations("hero");
  const router = useRouter();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const { data: origins = [], isLoading: originsLoading } = useStartLocation();
  const { data: destinations = [], isLoading: destinationsLoading } = useEndLocation(from);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (from) params.set("from", from);
    if (to) params.set("to", to);
    if (date) params.set("departureDate", date);
    router.push(`/route?${params.toString()}`);
  };

  useEffect(() => {
    setTo("");
  }, [from]);

  return (
    <>
      
      <section className="relative w-full h-[700] overflow-hidden">
    
        <Image
          src={home}
          alt="Bus travel background"
          fill
          priority
          className="w-full h-full object-cover object-center"
        />

     
        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/75 to-black/90" />

        
        <div className="relative z-10 flex flex-col items-center justify-center h-200 px-4 sm:px-8 pt-24 pb-16 text-center">

          <div className="max-w-4xl mx-auto mb-10 sm:mb-14">
            <h1 className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-5 drop-shadow-lg">
              {t("title")}
            </h1>
            <p className="text-white/85 text-base sm:text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
              {t("description")}
            </p>
            <Link href="/route">
              <Button
                variant="default"
                className="bg-green-800 text-white rounded-full font-semibold transition-all duration-200 hover:bg-green-700 hover:scale-105 active:scale-95 px-10 py-3 h-auto text-base shadow-xl cursor-pointer"
              >
                {t("viewSchedules")}
              </Button>
            </Link>
          </div>

    
          <div className="w-full max-w-5xl mx-auto px-2 sm:px-4 md:px-0">
            <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10 border-2 border-green-900">
              
              {/* Desktop Layout - Grid */}
              <div className="hidden md:grid grid-cols-12 gap-4 items-end">
                
                {/* From Location */}
                <div className="col-span-3">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="text-green-600" />
                      {t("search.from")}
                    </div>
                  </label>
                  <Select value={from} onValueChange={setFrom} disabled={originsLoading}>
                    <SelectTrigger className="w-full border-2 border-green-500 rounded-xl h-14 capitalize text-base focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all hover:border-green-600">
                      <SelectValue className="capitalize" placeholder={t("search.from")} />
                    </SelectTrigger>
                    <SelectContent>
                      {origins.map((origin, idx) => (
                        <SelectItem className="capitalize" key={idx} value={origin}>
                          {origin}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                
                {/* To Location */}
                <div className="col-span-3">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="text-green-600" />
                      {t("search.to")}
                    </div>
                  </label>
                  <Select value={to} onValueChange={setTo} disabled={!from || destinationsLoading}>
                    <SelectTrigger className="w-full border-2 border-green-500 rounded-xl h-14 capitalize text-base focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all hover:border-green-600">
                      <SelectValue className="capitalize" placeholder={t("search.to")} />
                    </SelectTrigger>
                    <SelectContent>
                      {destinations.map((dest, idx) => (
                        <SelectItem className="capitalize" key={idx} value={dest}>
                          {dest}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

               
                {/* Date */}
                <div className="col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-green-600" />
                      {t("search.date")}
                    </div>
                  </label>
                  <Input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full border-2 border-green-500 rounded-xl h-14 text-base focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none transition-all hover:border-green-600 px-4"
                  />
                </div>

                
                {/* Search Button */}
                <div className="col-span-4 flex gap-2">
                  <Button
                    onClick={handleSearch}
                    className="w-full bg-gradient-to-r from-green-700 to-green-800 text-white rounded-xl font-bold transition-all duration-200 hover:from-green-600 hover:to-green-700 hover:shadow-lg active:scale-95 h-14 text-base flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                  >
                    <Search size={18} />
                    {t("search.findBus")}
                  </Button>
                </div>
              </div>

              
              {/* Tablet Layout */}
              <div className="hidden sm:grid md:hidden grid-cols-2 gap-4 items-end">
                
                {/* From */}
                <div className="col-span-1">
                  <label className="block text-xs font-semibold text-gray-700 mb-2">
                    <div className="flex items-center gap-1">
                      <MapPin size={14} className="text-green-600" />
                      {t("search.from")}
                    </div>
                  </label>
                  <Select value={from} onValueChange={setFrom} disabled={originsLoading}>
                    <SelectTrigger className="w-full border-2 border-green-500 rounded-lg h-12 capitalize text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all hover:border-green-600">
                      <SelectValue className="capitalize" placeholder={t("search.from")} />
                    </SelectTrigger>
                    <SelectContent>
                      {origins.map((origin, idx) => (
                        <SelectItem className="capitalize" key={idx} value={origin}>
                          {origin}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                
                {/* To */}
                <div className="col-span-1">
                  <label className="block text-xs font-semibold text-gray-700 mb-2">
                    <div className="flex items-center gap-1">
                      <MapPin size={14} className="text-green-600" />
                      {t("search.to")}
                    </div>
                  </label>
                  <Select value={to} onValueChange={setTo} disabled={!from || destinationsLoading}>
                    <SelectTrigger className="w-full border-2 border-green-500 rounded-lg h-12 capitalize text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all hover:border-green-600">
                      <SelectValue className="capitalize" placeholder={t("search.to")} />
                    </SelectTrigger>
                    <SelectContent>
                      {destinations.map((dest, idx) => (
                        <SelectItem className="capitalize" key={idx} value={dest}>
                          {dest}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                
                {/* Date */}
                <div className="col-span-1">
                  <label className="block text-xs font-semibold text-gray-700 mb-2">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} className="text-green-600" />
                      {t("search.date")}
                    </div>
                  </label>
                  <Input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full border-2 border-green-500 rounded-lg h-12 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none transition-all hover:border-green-600 px-3"
                  />
                </div>

                
                {/* Button */}
                <div className="col-span-1">
                  <Button
                    onClick={handleSearch}
                    className="w-full bg-gradient-to-r from-green-700 to-green-800 text-white rounded-lg font-bold transition-all duration-200 hover:from-green-600 hover:to-green-700 hover:shadow-lg active:scale-95 h-12 text-sm flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                  >
                    <Search size={16} />
                    {t("search.findBus")}
                  </Button>
                </div>
              </div>

              
              {/* Mobile Layout - Stacked */}
              <div className="sm:hidden flex flex-col gap-3">
                
                {/* From */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-2">
                    <div className="flex items-center gap-1">
                      <MapPin size={14} className="text-green-600" />
                      {t("search.from")}
                    </div>
                  </label>
                  <Select value={from} onValueChange={setFrom} disabled={originsLoading}>
                    <SelectTrigger className="w-full border-2 border-green-500 rounded-lg h-12 capitalize text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all hover:border-green-600">
                      <SelectValue className="capitalize" placeholder={t("search.from")} />
                    </SelectTrigger>
                    <SelectContent>
                      {origins.map((origin, idx) => (
                        <SelectItem className="capitalize" key={idx} value={origin}>
                          {origin}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                
                {/* To */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-2">
                    <div className="flex items-center gap-1">
                      <MapPin size={14} className="text-green-600" />
                      {t("search.to")}
                    </div>
                  </label>
                  <Select value={to} onValueChange={setTo} disabled={!from || destinationsLoading}>
                    <SelectTrigger className="w-full border-2 border-green-500 rounded-lg h-12 capitalize text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all hover:border-green-600">
                      <SelectValue className="capitalize" placeholder={t("search.to")} />
                    </SelectTrigger>
                    <SelectContent>
                      {destinations.map((dest, idx) => (
                        <SelectItem className="capitalize" key={idx} value={dest}>
                          {dest}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                
                {/* Date */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-2">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} className="text-green-600" />
                      {t("search.date")}
                    </div>
                  </label>
                  <Input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full border-2 border-green-500 rounded-lg h-12 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none transition-all hover:border-green-600 px-3"
                  />
                </div>

                
                {/* Button */}
                <Button
                  onClick={handleSearch}
                  className="w-full bg-gradient-to-r from-green-700 to-green-800 text-white rounded-lg font-bold transition-all duration-200 hover:from-green-600 hover:to-green-700 hover:shadow-lg active:scale-95 h-12 text-sm flex items-center justify-center gap-2 shadow-lg cursor-pointer mt-1"
                >
                  <Search size={16} />
                  {t("search.findBus")}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

    
      <div className="mx-4 sm:mx-8 md:mx-16 lg:mx-28">
        <TripCard trips="500K+" rating={4.9} departures="99%" />

        <Container>
          <section className="mb-2 md:mb-32">
            <div className="text-center mt-16 sm:mt-20 md:mt-24">
              <h1 className="text-2xl sm:text-3xl font-extrabold">{t("whyChoose")}</h1>
            </div>
            <CardSection />
          </section>

          <div className="bg-[#0B3B2E] px-4 sm:px-8 lg:px-18 mt-20 py-12 text-white rounded">
            <Container className="flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-10 text-center sm:text-left">
              <div className="w-full sm:w-auto">
                <h3 className="uppercase text-sm tracking-wide">{t("ready")}</h3>
                <h1 className="text-2xl sm:text-3xl font-bold mt-2">{t("headline")}</h1>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto justify-center sm:justify-start">
                <div className="flex items-center justify-center border border-lime-400 rounded-full w-16 h-16">
                  <Phone size={30} className="text-lime-400" />
                </div>
                <div className="text-center sm:text-left">
                  <p className="text-sm">{t("call_us")}</p>
                  <h4 className="text-xl font-bold">{t("phone")}</h4>
                </div>
              </div>

              <Link
                href="#contact"
                className="w-full sm:w-auto flex items-center justify-center gap-2 border border-lime-400 rounded-full px-5 py-2 text-sm font-semibold hover:bg-lime-500 hover:text-white text-white transition"
              >
                <ThumbsUp className="text-lime-400" />
                {t("contact_button")}
              </Link>
            </Container>
          </div>

          <Container>
            <h2 className="text-center text-3xl font-bold mt-20 mb-10">{t("patterns_title")}</h2>
            <div className="flex flex-wrap justify-center gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-14 px-4 sm:px-0">
              <Image
                src="/images/logoipsum-380.png"
                alt="logo"
                width={100}
                height={100}
                className="rounded-full"
              />
              <Image
                src="/images/logoipsum-380.png"
                alt="logo"
                width={100}
                height={100}
                className="rounded-full"
              />
              <Image
                src="/images/logoipsum-380.png"
                alt="logo"
                width={100}
                height={100}
                className="rounded-full"
              />
              <Image
                src="/images/logoipsum-380.png"
                alt="logo"
                width={100}
                height={100}
                className="rounded-full"
              />
            </div>
          </Container>

          <Contact />
          <PopularRoutesSection />
        </Container>
      </div>
    </>
  );
};

export default Hero;
