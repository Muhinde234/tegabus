import React from "react";
import Head from "next/head";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { steps } from "../../../../helpers/data";
import FeatureSection from "@/components/ui/featureSection";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import aboutImage from "../../../../public/images/about.png";

const AboutPage: React.FC = () => {
  const t = useTranslations("about");

  return (
    <>
      <Head>
        <title>{t("pageTitle")}</title>
        <meta
          name="description"
          content={t("pageDescription")}
        />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <section className="relative isolate -mt-20 overflow-hidden bg-[#0B3B2E] pt-20 text-white md:-mt-24 md:pt-24">
          <div className="absolute inset-0">
            <Image
              src={aboutImage}
              alt="About TegaBus"
              fill
              priority
              className="object-cover object-center opacity-30"
            />
          </div>

          <div className="absolute inset-0 bg-linear-to-b from-[#0B3B2E]/95 via-[#0B3B2E]/85 to-[#0B3B2E]/95" />

          <div className="relative z-10 mx-auto flex min-h-135 max-w-7xl items-center px-4 py-16 text-center sm:px-6 lg:px-8 xl:px-0">
            <div className="mx-auto max-w-4xl">
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-lime-300">
                {t("hero.tagline")}
              </p>
              <h1 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
                {t("hero.title")} <span className="text-lime-400">{t("hero.titleHighlight")}</span>
              </h1>
              <p className="mx-auto mt-6 max-w-3xl text-base leading-7 text-white/85 sm:text-lg">
                {t("hero.description")}
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link href="/route">
                  <Button className="bg-[#062d23] text-white hover:bg-[#0b3b2e]">
                    {t("cta.button")}
                  </Button>
                </Link>
                <Link href="/login">
                  <Button variant="outline" className="border-white/30 bg-white/10 text-white hover:bg-white/20">
                    {t("cta.title")}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 px-4 sm:px-8 lg:px-16 ">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
              <div className="bg-white md:shadow-lg rounded-2xl p-8 text-center border border-lime-300 hover:shadow-xl transition-all duration-300">
                <h2 className="text-2xl md:text-4xl font-extrabold text-[#0B3B2E] mb-4 tracking-tight">
                  {t("mission.title")}
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {t("mission.description")}{" "}
                  <span className="text-lime-600 font-semibold">
                    {t("mission.highlight")}
                  </span>{" "}
                  {t("mission.suffix")}
                </p>
              </div>

              <div className="bg-white md:shadow-lg rounded-2xl p-8 text-center border border-lime-300 hover:shadow-xl transition-all duration-300">
                <h2 className="text-2xl md:text-4xl  font-extrabold text-[#0B3B2E] mb-4 tracking-tight">
                  {t("vision.title")}
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {t("vision.description")}{" "}
                  <span className="text-lime-600 font-semibold">
                    {t("vision.highlight")}
                  </span>{" "}
                  {t("vision.suffix")}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-[#0B3B2E] text-center mb-12">
              {t("features.title")}
            </h2>
            <FeatureSection />
          </div>
        </section>

        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#0B3B2E] text-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
              {t("howItWorks.title")} <span className="text-lime-400">{t("howItWorks.titleHighlight")}</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {steps.map((item, index) => (
                <StepCard key={index} item={item} />
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 px-4 sm:px-6 lg:px-8 ">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-[#0B3B2E] mb-6">
              {t("cta.title")}
            </h2>
            <Link href="/login">
             <Button variant="default" className="bg-[#0B3B2E] text-white rounded-lg font-semibold transition hover:bg-green-700 w-37.5 sm:w-47.5 h-10 cursor-pointer py-2 px-2">
              {t("cta.button")}
            </Button>
            </Link>
           
          </div>
        </section>
      </div>
    </>
  );
};


const StepCard: React.FC<{ item: any; }> = ({ item }) => {
  const tSteps = useTranslations("steps");

  const getStepTranslation = (step: string) => {
    switch (step) {
      case "1": return { title: tSteps("search.title"), desc: tSteps("search.description") };
      case "2": return { title: tSteps("compare.title"), desc: tSteps("compare.description") };
      case "3": return { title: tSteps("book.title"), desc: tSteps("book.description") };
      case "4": return { title: tSteps("ticket.title"), desc: tSteps("ticket.description") };
      default: return { title: item.title, desc: item.desc };
    }
  };

  const translatedStep = getStepTranslation(item.step);

  return (
    <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm border border-lime-400/20">
      <div className="w-12 h-12 bg-lime-500 rounded-full flex items-center justify-center text-xl font-bold text-[#0B3B2E] mb-4">
        {item.step}
      </div>
      <h3 className="text-xl font-semibold mb-2">{translatedStep.title}</h3>
      <p className="text-gray-300">{translatedStep.desc}</p>
    </div>
  );
};

export default AboutPage;
