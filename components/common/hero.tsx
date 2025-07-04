import Image from "next/image";
import home from "../../public/images/home.jpg";
import Container from "../ui/container";
import Link from "next/link";
import TripCard from "../ui/TripCard";
import CardSection from "../ui/cardSection";
import { Phone, ThumbsUp } from "lucide-react";
import Contact from "../ui/contactForm";
import { popularRoutes } from "@/helpers/data";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/inputField";
import Head from "next/head";

const Hero = () => {
  return (
    <>
      <Head>
        <title>Home Page </title>
        <meta
          name="description"
          content="landing page of the tegabus platform"
        />
      </Head>
      <div className="mx-4 sm:mx-8 md:mx-16 lg:mx-28 mt-16 sm:mt-20 md:mt-[84px]">
        <section className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[700px] rounded-3xl overflow-hidden">
          <Image
            src={home}
            alt="Bus travel background"
            fill
            priority
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50 flex flex-col px-4 sm:px-8 md:px-14 pt-8 sm:pt-10 md:pt-14">
            <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4 mt-12 sm:mt-16 md:mt-24">
              Seamless Ticket <br /> Booking with TegaBus
            </h1>
            <p className="text-white text-sm sm:text-md md:text-lg lg:w-[930px] mb-4 sm:mb-6">
              Say goodbye to long queues! Book your bus tickets instantly,
              securely, and hassle-free. Whether you're commuting or traveling
              long distances, TegaBus makes your journey smoother with just a
              few clicks.
            </p>
            <Link href="/route">
              <Button
                variant="default"
                className="bg-[#0B3B2E] text-white rounded-lg font-semibold transition hover:bg-green-700 w-full sm:w-[190px] h-[35px] cursor-pointer"
              >
                View Schedules
              </Button>
            </Link>
          </div>

          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[95%] sm:w-[90%] md:w-[85%] lg:w-[80%] bg-white rounded-t-xl p-3 sm:p-4 md:p-6 flex flex-col sm:flex-row flex-wrap items-center justify-between gap-3 sm:gap-4 md:gap-6">
            <Select>
              <SelectTrigger className="w-full sm:w-[48%] md:w-[23%] border border-green-300 p-2 sm:p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                <SelectValue placeholder="Start location" />
              </SelectTrigger>
              <SelectContent className="border border-gray-300">
                <SelectItem value="light" >Kigali</SelectItem>
                <SelectItem value="dark">Rusomo</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-full sm:w-[48%] md:w-[23%] border border-green-300 p-2 sm:p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                <SelectValue placeholder="End location" />
              </SelectTrigger>
              <SelectContent className="border border-gray-300">
                <SelectItem value="light">Kigali</SelectItem>
                <SelectItem value="dark">Rusomo</SelectItem>
              </SelectContent>
            </Select>
            <Input
              type="date"
              className="w-full sm:w-[48%] md:w-[23%] border border-green-300 p-2 sm:p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              defaultValue="2025-05-25"
            />
            <div className="">
              <Link href="/login">
                <Button
                  variant="secondary"
                  className="bg-[#0B3B2E] text-white rounded-lg font-semibold transition hover:bg-green-700 w-full sm:w-[190px] h-[38px] cursor-pointer py-2 px-2"
                >
                  Find schedules
                </Button>
              </Link>
            </div>
          </div>
        </section>
        <TripCard trips="500K+" rating={4.9} departures="99%" />

        <Container>
          <section className="mb-32">
            <div className="text-center mt-16 sm:mt-20 md:mt-24">
              <h1 className="text-primary-100 text-2xl sm:text-3xl font-extrabold">
                Why Choose Us
              </h1>
            </div>
            <CardSection />
          </section>

          <div className="bg-[#0B3B2E] p-18 mt-20 py-12 text-white rounded">
            <Container className="flex flex-col sm:flex-row items-center justify-between gap-10 text-center sm:text-left">
              <div>
                <h3 className="uppercase text-sm tracking-wide">
                  Ready to Ride?
                </h3>
                <h1 className="text-2xl sm:text-3xl font-bold mt-2">
                  Book Your Next Journey with Confidence
                </h1>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center border border-lime-400 rounded-full w-16 h-16">
                  <Phone size={30} className="text-lime-400" />
                </div>
                <div className="text-left">
                  <p className="text-sm">Call us anytime</p>
                  <h4 className="text-xl font-bold">(+250) 780 396 766</h4>
                </div>
              </div>

              <Link
                href="#contact"
                className="flex items-center gap-2 border border-lime-400 rounded-full px-5 py-2 text-sm font-semibold hover:bg-lime-50 text-white hover:text-[#0B3B2E] transition"
              >
                <ThumbsUp className="text-lime-400" />
                Contact Us
              </Link>
            </Container>
          </div>
          <Container>
            <h2 className="text-center text-3xl font-bold mt-20 mb-10">
              Our Patterns
            </h2>
            <div className="flex justify-around  mt-18">
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

          <h2 className="text-center text-3xl font-bold mt-20 mb-10">
            Top Travel Routes
          </h2>
          <div className="mb-20 bg-gradient-to-r from-[#0B3B2E] to-lime-700 rounded-xl shadow-lg">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 p-8">
              {popularRoutes.map((route, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-bold text-white text-lg">
                        {route.from} — {route.to}
                      </h3>
                      <p className="text-lime-200">
                        {route.buses}+ buses daily
                      </p>
                    </div>
                    <Button
                      variant="default"
                      className="bg-lime-400 hover:bg-lime-300 rounded-lg py-2 px-2"
                    >
                      <Link href="/route">View schedules</Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Hero;
