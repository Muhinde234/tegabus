import { useTranslations } from "next-intl";
import FeatureCard from "../ui/card";
import { features } from "../../helpers/data";

const FeatureSection = () => {
  const t = useTranslations("features");

  const getFeatureTranslation = (originalTitle: string) => {
    switch (originalTitle) {
      case "One-Stop Booking":
        return {
          title: t("oneStopBooking.title"),
          description: t("oneStopBooking.description")
        };
      case "Real-Time Availability":
        return {
          title: t("realTimeAvailability.title"),
          description: t("realTimeAvailability.description")
        };
      case "Secure Payments":
        return {
          title: t("securePayments.title"),
          description: t("securePayments.description")
        };
      case "Smart Search":
        return {
          title: t("smartSearch.title"),
          description: t("smartSearch.description")
        };
      case "24/7 Support":
        return {
          title: t("support.title"),
          description: t("support.description")
        };
      case "Exclusive Discounts":
        return {
          title: t("discounts.title"),
          description: t("discounts.description")
        };
      default:
        return {
          title: originalTitle,
          description: ""
        };
    }
  };

  return (
    <div>

      <div className="py-10 px-4 sm:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10   ">
          {features.map((feature, index) => {
            const translatedFeature = getFeatureTranslation(feature.title);
            return (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={translatedFeature.title}
                description={translatedFeature.description}
              />
            );
          })}
        </div>
      </div>

    </div>
  );
};

export default FeatureSection;
