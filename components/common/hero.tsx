"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import home from "./../../public/images/home.jpg";
import Container from "../ui/container";
import Link from "next/link";
import TripCard from "../ui/TripCard";
import CardSection from "../ui/cardSection";
import { Phone, ThumbsUp } from "lucide-react";
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
      {/* ── FULL-WIDTH HERO ── */}
      <section className="relative w-full min-h-screen overflow-hidden">
        {/* Background image */}
        <Image
          src={home}
          alt="Bus travel background"
          fill
          priority
          className="w-full h-full object-cover object-center"
        />

        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-b from-black/75 via-black/55 to-black/80" />

        {/* Centered hero content */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-8 pt-24 pb-16 text-center">

          {/* Heading + description + CTA */}
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
                className="bg-[#0B3B2E] text-white rounded-full font-semibold transition-all duration-200 hover:bg-green-700 hover:scale-105 active:scale-95 px-10 py-3 h-auto text-base shadow-xl cursor-pointer"
              >
                {t("viewSchedules")}
              </Button>
            </Link>
          </div>

          {/* ── Modern search card ── */}
          <div className="w-full max-w-5xl mx-auto">
            <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-3 sm:p-4 flex flex-col sm:flex-row flex-wrap items-center gap-3">

              {/* From */}
              <div className="relative w-full sm:flex-1 min-w-35">
                <Select value={from} onValueChange={setFrom} disabled={originsLoading}>
                  <SelectTrigger className="w-full border border-green-200 rounded-xl h-12 capitalize focus:ring-2 focus:ring-green-500 transition-shadow hover:shadow-sm">
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
              <div className="relative w-full sm:flex-1 min-w-35">
                <Select value={to} onValueChange={setTo} disabled={!from || destinationsLoading}>
                  <SelectTrigger className="w-full border capitalize border-green-200 rounded-xl h-12 focus:ring-2 focus:ring-green-500 transition-shadow hover:shadow-sm">
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
              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full sm:flex-1 min-w-35 border border-green-200 rounded-xl h-12 focus:ring-2 focus:ring-green-500 focus:outline-none transition-shadow hover:shadow-sm px-3"
              />

              {/* Search button */}
              <div className="w-full sm:w-auto">
                <Button
                  variant="secondary"
                  onClick={handleSearch}
                  className="bg-[#0B3B2E] text-white rounded-xl font-semibold transition-all duration-200 hover:bg-green-700 hover:scale-105 active:scale-95 w-full sm:w-auto px-10 h-12 shadow-lg cursor-pointer"
                >
                  {t("search.findBus")}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTIONS BELOW HERO ── */}
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
