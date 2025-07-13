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


const Hero = () => {
  const t = useTranslations("hero");

  return (
    <>

      <div className="mx-4 sm:mx-8 md:mx-16 lg:mx-28 mt-16 sm:mt-20 md:mt-[84px]">
        <section className="relative top-12 md:top-0 w-full h-[500px] sm:h-[400px] md:h-[500px] lg:h-[700px] rounded-3xl overflow-hidden">
          <Image
            src={home}
            alt="Bus travel background"
            fill
            priority
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50 flex flex-col px-4 sm:px-8 md:px-14 pt-8 sm:pt-10 md:pt-14">
            <div className="absolute -top-3">
              <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4 mt-12 sm:mt-16 md:mt-24">
                {t("title")}
              </h1>
              <p className="text-white text-sm sm:text-md md:text-lg lg:w-[930px] mb-4 sm:mb-6">
                {t("description")}
              </p>
              <Link href="/route">
                <Button
                    variant="default"
                    className="bg-[#0B3B2E] text-white rounded-lg font-semibold transition hover:bg-green-700 w-[140px] sm:w-[190px] h-[35px] cursor-pointer"
                >
                  {t("viewSchedules")}
                </Button>
              </Link>
            </div>
          </div>

          <div className="bottom-4 rounded-xl absolute md:bottom-0 left-1/2 transform -translate-x-1/2 w-[95%] sm:w-[90%] md:w-[85%] lg:w-[80%] bg-white md:rounded-b-none md:rounded-t-xl p-3 sm:p-4 md:p-6 flex flex-col sm:flex-row flex-wrap items-center justify-between gap-3 sm:gap-4 md:gap-6">
            <Select>
              <SelectTrigger className="w-full sm:w-[48%] md:w-[23%] border border-green-300 p-2 sm:p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                <SelectValue placeholder={t("search.from")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Kigali</SelectItem>
                <SelectItem value="dark">Rusomo</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-full sm:w-[48%] md:w-[23%] border border-green-300 p-2 sm:p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                <SelectValue placeholder={t("search.to")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Kigali</SelectItem>
                <SelectItem value="dark">Rusomo</SelectItem>
              </SelectContent>
            </Select>
            <Input
              type="date"
              className="w-full sm:w-[48%] md:w-[23%] border border-green-300 p-2 sm:p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              defaultValue="2025-05-25"
            />
            <div className="w-full">
              <Link href="/login">
                <Button
                  variant="secondary"
                  className="bg-[#0B3B2E] text-white rounded-lg font-semibold transition hover:bg-green-700 w-full sm:w-[190px] h-[38px] cursor-pointer py-2 px-2"
                >
                  {t("search.findBus")}
                </Button>
              </Link>
            </div>
          </div>
        </section>
        <TripCard trips="500K+" rating={4.9} departures="99%" />

        <Container>
          <section className=" mb-2 md:mb-32 ">
            <div className="text-center mt-16 sm:mt-20 md:mt-24">
              <h1 className=" text-2xl sm:text-3xl font-extrabold">
                {t("whyChoose")}
              </h1>
            </div>
            <CardSection />
          </section>
          <div className="bg-[#0B3B2E] px-4 sm:px-8 lg:px-18 mt-20 py-12 text-white rounded">
            <Container className="flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-10 text-center sm:text-left">
              <div className="w-full sm:w-auto">
                <h3 className="uppercase text-sm tracking-wide">
                  {t("ready")}
                </h3>
                <h1 className="text-2xl sm:text-3xl font-bold mt-2">
                {t("headline")}
                </h1>
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
                className="w-full sm:w-auto flex items-center justify-center gap-2 border border-lime-400 rounded-full px-5 py-2 text-sm font-semibold hover:bg-lime-500 hover:text-white text-white  transition"
              >
                <ThumbsUp className="text-lime-400 " />
                {t("contact_button")}
              </Link>
            </Container>
          </div>

          <Container>
            <h2 className="text-center text-3xl font-bold mt-20 mb-10">
               {t("patterns_title")}
            </h2>
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
              />{" "}
              <Image
                src="/images/logoipsum-380.png"
                alt="logo"
                width={100}
                height={100}
                className="rounded-full"
              />{" "}
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
 <PopularRoutesSection/>
         
        </Container>
      </div>
    </>
  );
};

export default Hero;