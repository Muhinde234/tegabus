"use client";

import { TicketIcon, ShieldCheckIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import Card from "../ui/card";


const useInfoData = () => {
  const t = useTranslations("info");

  return [
    {
      icon: TicketIcon,
      title: t("title_1"),
      description: t("description_1"),
    },
    {
      icon: ShieldCheckIcon,
      title: t("title_2"),
      description: t("description_2"),
    },
    {
      icon: TicketIcon,
      title: t("title_3"),
      description: t("description_3"),
    },
  ];
};


const CardSection = () => {
  const infos = useInfoData(); 

  return (
    <div>
      <div className="py-5 md:py-10 px-4 sm:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {infos.map((info, index) => (
            <Card
              key={index}
              icon={info.icon}
              title={info.title}
              description={info.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardSection;
