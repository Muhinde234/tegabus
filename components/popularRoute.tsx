import { useTranslations } from "next-intl";
import { Button } from "./ui/button";
import Link from "next/link";
import { popularRoutes } from "@/helpers/data";

const PopularRoutesSection = () => {
  const t = useTranslations("routes.popularRoutes");
 
  return (
    <div className="mt-16 sm:mt-20 md:mt-24">
      <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-10">
        {t("title")}
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
                    {route.buses}+ {t("buses")}
                  </p>
                </div>
                <Button
                  variant="default"
                  className="bg-lime-400 hover:bg-lime-300 rounded-lg py-1 px-2 sm:py-2 sm:px-3 text-xs sm:text-sm"
                >
                  <Link href="/route">{t("viewSchedules")}</Link>
                </Button>
            
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default PopularRoutesSection;