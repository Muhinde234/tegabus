"use client";

import { useTranslations } from "next-intl";
import Container from "@/components/ui/container";
import TermsCard from "../../../../components/termsCard";
import { termsData } from "@/helpers/data";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function TermsPage() {
  const t = useTranslations("conditions");
  const tTerms = useTranslations("terms");

  return (
    <main className="">
      <section className="bg-[#0B3B2E] text-white py-20 pt-42  sm:px-6 lg:px-32">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl  font-bold mb-6">{t("hero.title")}</h1>
          <p className=" max-w-3xl mx-auto">{t("hero.description")}</p>
          <p>{t("hero.tagline")}</p>
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
