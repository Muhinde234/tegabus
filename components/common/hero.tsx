﻿"use client";

import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import home from "./../../public/images/bus2.jpg";
import Container from "../ui/container";
import Link from "next/link";
import TripCard from "../ui/TripCard";
import CardSection from "../ui/cardSection";
import { ArrowRight, Building2, CheckCircle2, FileCheck2, MapPin, Loader2 } from "lucide-react";
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
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

const Hero = () => {
  const t = useTranslations("hero");
  const routesT = useTranslations("routes");
  const locale = useLocale();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [from, setFrom] = useState(searchParams.get("from") || "");
   const [to, setTo] = useState(searchParams.get("to") || "");
   const [date, setDate] = useState(searchParams.get("departureDate") || "");
  const [loading, setLoading] = useState(false);
  const { data: origins = [], isLoading: originsLoading } = useStartLocation();
  const { data: destinations = [], isLoading: destinationsLoading } = useEndLocation(from);

  // Logo array for the marquee
  const partnerLogos = [
    { src: "/images/trinity.png", alt: "trinity Logo", width: 100, height: 100 },
    { src: "/images/volcano_log.png", alt: "Volcon Logo", width: 100, height: 100 },
    { src: "/images/ritco.png", alt: "Ritco Logo", width: 100, height: 100 },
    { src: "/images/rtda.jpg", alt: "RTDA Logo", width: 100, height: 100 },
    { src: "/images/horizon.png", alt: "Horizon Logo", width: 100, height: 100 },
  ];

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
    <>
      
      <section className="relative w-full h-[700] overflow-hidden">
    
        <Image
          src={home}
          alt="Bus travel background"
          fill
          priority
          className="w-full h-full object-cover object-center"
        />

     
        <div className="absolute inset-0 bg-linear-to-b from-black/85 via-black/75 to-black/90" />

        
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
                className="bg-[#062d23] text-white rounded-full font-semibold transition-all duration-200 hover:bg-[#0b3b2e] hover:scale-105 active:scale-95 px-10 py-3 h-auto text-base shadow-xl cursor-pointer"
              >
                {t("viewSchedules")}
              </Button>
            </Link>
          </div>

    
          <div className="w-full max-w-5xl mx-auto px-2 sm:px-4 md:px-0">
            <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10 border-2 border-green-900">
              <div className="bg-white border border-gray-400 p-5 rounded-lg grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div className="relative">
                  <Select value={from} onValueChange={(value) => setFrom(value)} disabled={originsLoading}>
                    <SelectTrigger className="w-full capitalize p-3 border rounded text-gray-800">
                      <SelectValue placeholder={routesT("search.from")} />
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
                  <Select value={to} onValueChange={(value) => setTo(value)} disabled={!from || destinationsLoading}>
                    <SelectTrigger className="w-full capitalize p-3 border rounded text-gray-800">
                      <SelectValue placeholder={routesT("search.to")} />
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
                  className="bg-[#062d23] hover:bg-[#0b3b2e] text-white font-bold py-3 px-6 rounded-full flex items-center justify-center cursor-pointer"
                >
                  {loading ? <Loader2 className="animate-spin" /> : routesT("search.searchButton")}
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

          <div className="mt-20">
            <Container className="relative overflow-hidden rounded-3xl border border-emerald-300/30 bg-linear-to-br from-[#062d23] via-[#0c4637] to-[#13503f] px-5 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-12 text-white shadow-2xl">
              <div aria-hidden className="pointer-events-none absolute -top-24 -right-10 h-52 w-52 rounded-full bg-amber-300/20 blur-3xl" />
              <div aria-hidden className="pointer-events-none absolute -bottom-20 -left-14 h-56 w-56 rounded-full bg-emerald-300/20 blur-3xl" />

              <div className="relative grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center lg:gap-8">
                <div className="text-center sm:text-left lg:col-span-5">
                  <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-white">{t("companyCta.eyebrow")}</h3>
                  <h1 className="mt-3 text-2xl font-extrabold leading-tight sm:text-3xl lg:text-4xl">{t("companyCta.title")}</h1>
                  <p className="mt-4 text-lg leading-relaxed text-emerald-50/85 sm:text-base">{t("companyCta.description")}</p>

                  <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                    <Link
                    href={`/${locale}/onboarding`}
                      className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-[#062d23] transition hover:-translate-y-0.5 "
                    >
                      <Building2 size={16} />
                      {t("companyCta.primaryButton")}
                      <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                    </Link>
                    <Link
                      href="#contact"
                      className="inline-flex items-center justify-center rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#062d23] transition"
                    >
                      {t("companyCta.secondaryButton")}
                    </Link>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:col-span-7">
                  <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
                    <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-emerald-200/15 ring-1 ring-emerald-100/50">
                      <Building2 size={18} className="text-emerald-100" />
                    </div>
                    <h4 className="text-sm font-bold text-white">{t("companyCta.steps.create.title")}</h4>
                    <p className="mt-2 text-xs leading-relaxed text-emerald-50/85">{t("companyCta.steps.create.description")}</p>
                  </div>

                  <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
                    <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-emerald-200/15 ring-1 ring-emerald-100/50">
                      <FileCheck2 size={18} className="text-emerald-100" />
                    </div>
                    <h4 className="text-sm font-bold text-white">{t("companyCta.steps.verify.title")}</h4>
                    <p className="mt-2 text-xs leading-relaxed text-emerald-50/85">{t("companyCta.steps.verify.description")}</p>
                  </div>

                  <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
                    <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-emerald-200/15 ring-1 ring-emerald-100/50">
                      <CheckCircle2 size={18} className="text-emerald-100" />
                    </div>
                    <h4 className="text-sm font-bold text-white">{t("companyCta.steps.publish.title")}</h4>
                    <p className="mt-2 text-xs leading-relaxed text-emerald-50/85">{t("companyCta.steps.publish.description")}</p>
                  </div>
                </div>
              </div>
            </Container>
          </div>

          <Container>
            <h2 className="text-center text-3xl font-bold mt-20 mb-10">{t("patterns_title")}</h2>
            <div className="overflow-hidden px-4 sm:px-0">
              <div className="marquee-track flex w-max items-center gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-14 py-2">
                {/* First set of logos */}
                <div className="flex items-center gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-14">
                  {partnerLogos.map((logo, idx) => (
                    <div key={idx} className="flex-shrink-0">
                      <Image
                        src={logo.src}
                        alt={logo.alt}
                        width={logo.width}
                        height={logo.height}
                        className="rounded-full object-cover bg-white p-1"
                      />
                    </div>
                  ))}
                </div>
                {/* Duplicate set for seamless looping */}
                <div className="flex items-center gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-14" aria-hidden="true">
                  {partnerLogos.map((logo, idx) => (
                    <div key={`duplicate-${idx}`} className="flex-shrink-0">
                      <Image
                        src={logo.src}
                        alt={logo.alt}
                        width={logo.width}
                        height={logo.height}
                        className="rounded-full object-cover bg-white p-1"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <style jsx>{`
              .marquee-track {
                animation: marquee 18s linear infinite;
              }

              @keyframes marquee {
                from {
                  transform: translateX(0);
                }
                to {
                  transform: translateX(-50%);
                }
              }
            `}</style>
          </Container>

          <Contact />
          <PopularRoutesSection />
        </Container>
      </div>
    </>
  );
};

export default Hero;