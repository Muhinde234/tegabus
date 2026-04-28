"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import Container from "@/components/ui/container";
import TermsCard from "../../../../components/termsCard";
import { termsData } from "@/helpers/data";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import conditionsImage from "../../../../public/images/about.png";

export default function TermsPage() {
  const t = useTranslations("conditions");


  return (
    <main className="bg-gray-50">
      <section className="relative isolate -mt-20 overflow-hidden bg-[#0B3B2E] pt-20 text-white md:-mt-24 md:pt-24">
        <div className="absolute inset-0">
          <Image
            src={conditionsImage}
            alt="Conditions background"
            fill
            priority
            className="object-cover object-center opacity-30"
          />
        </div>

        <div className="absolute inset-0 bg-linear-to-b from-[#0B3B2E]/95 via-[#0B3B2E]/85 to-[#0B3B2E]/95" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-32">
          <h1 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">{t("hero.title")}</h1>
          <p className="mx-auto mt-6 max-w-3xl text-base leading-7 text-white/85 sm:text-lg">{t("hero.description")}</p>
          <p className="mt-4 text-base leading-7 text-white/80 sm:text-lg">{t("hero.tagline")}</p>
        </div>
      </section>
      <Container>
        <h1 className="text-2xl md:text-3xl text-center font-bold  mt-18 text-[#0B3B2E]">
          {t("policy.title")}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-18 m-3">
          {termsData.map((term, index) => (
            <TranslatedTermsCard key={term.title} term={term} index={index} />
          ))}
        </div>
        <div className="flex justify-center items-center gap-5 my-18 ">
          <Link href="/login">
            <Button
              variant="default"
              className=" inline bg-[#0B3B2E] text-white rounded-sm px-4 py-2 hover:bg-green-700 cursor-pointer"
            >
              {t("actions.bookNow")}
            </Button>
          </Link>
          <Link href="/terms">
            <Button
              variant="outline"
              className="inline b rounded-sm px-4 py-2 border border-gray-500 cursor-pointer hover:bg-green-300"
            >
              {t("actions.viewMore")}
            </Button>
          </Link>
        </div>
      </Container>
    </main>
  );
}

// Component to render terms cards with translations
const TranslatedTermsCard: React.FC<{ term: any; index: number; }> = ({
  term,
  index,
}) => {
  const tTerms = useTranslations("terms");

  const getTermTranslation = (originalTitle: string) => {
    switch (originalTitle) {
      case "General Terms":
        return {
          title: tTerms("generalTerms.title"),
          content: tTerms("generalTerms.content"),
        };
      case "Safety and Security":
        return {
          title: tTerms("safety.title"),
          content: tTerms("safety.content"),
        };
      case "Booking & Cancellations":
        return {
          title: tTerms("booking.title"),
          content: tTerms("booking.content"),
        };
      case "Bus Routes and Delays":
        return {
          title: tTerms("routes.title"),
          content: tTerms("routes.content"),
        };
      default:
        return {
          title: term.title,
          content: term.content,
        };
    }
  };

  const translatedTerm = getTermTranslation(term.title);

  return (
    <TermsCard
      title={translatedTerm.title}
      content={translatedTerm.content}
      icon={term.icon}
    />
  );
};
