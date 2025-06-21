import Image from "next/image";
import Bus from "../../public/images/about.png";
import Container from "../ui/container";
import Button from "../ui/button";
import Link from "next/link";
import TripCard from "../ui/TripCard";
import CardSection from "../ui/cardSection";
import { Phone, ThumbsUp } from "lucide-react";
import Contact from "../ui/contactForm";
import { popularRoutes } from "@/helpers/data";



const Hero = () => {
  return (
    <div className="mt-32">
      <Container>
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="w-full lg:w-1/2 space-y-6">
            <h1 className="text-4xl font-bold leading-tight text-gray-900">
              Book Your Journey in Minutes
            </h1>
            <p className="text-lg text-gray-700">
              Experience the convenience of modern travel with our fast, secure,
              and user-friendly online bus ticket booking system. Whether you're
              commuting daily or planning a long-distance trip, enjoy flexible
              scheduling, instant seat reservations, and real-time updates — all
              from the comfort of your device.
            </p>
            <div className="flex gap-8 mt-18">
              <Button>
                <Link href="/">view schedules</Link>
              </Button>
              <Link
                href="/about"
                className="border border-[#0B3B2E] rounded-full py-2 px-4"
              >
                learn more
              </Link>
            </div>
          </div>

          <div className="w-full lg:w-1/2 mt-12">
            <Image
              src={Bus}
              alt="Bus"
              className="w-full h-auto rounded-xl shadow-md object-cover"
              priority
            />
          </div>
        </div>
        <div className="bg-white mt-18 border border-[#0B3B2E] rounded-xl p-3 sm:p-4 md:p-6 flex flex-col sm:flex-row flex-wrap items-center justify-between gap-3 sm:gap-4 md:gap-4">
          <select className="w-full sm:w-[48%] md:w-[23%] border border-green-600 p-3 sm:p-3 pr-10 rounded-lg focus:outline-none focus:ring-2">
            <option className="w-[22%] sm:full ">
              Start location
            </option>
          </select>

          <select className="w-full sm:w-[48%] md:w-[23%] border border-green-600 p-2 sm:p-3 pr-10 rounded-lg focus:outline-none focus:ring-2">
            <option className="w-[22%] sm:full bg-green-500">
              End location
            </option>
          </select>

          <input
            type="date"
            className="w-full sm:w-[48%] md:w-[23%] border border-green-600 p-2 sm:p-3 pr-10 rounded-lg focus:outline-none focus:ring-2"
            defaultValue="2025-05-25"
          />

          <div className="w-full sm:w-[48%] md:w-auto">
            <Link href="/login">
              <button className="w-full md:w-[150px] h-[45px] text-white bg-[#0B3B2E] rounded-lg hover:bg-green-700 transition">
                Find schedules
              </button>
            </Link>
          </div>
        </div>
      

        </Container>

        <TripCard trips="500K+" rating={4.9} departures="99%" />
        <Container>
        <div className="text-center mt-8 mb-16 sm:mt-20 md:mt-24">
          <h1 className=" text-2xl sm:text-3xl font-extrabold">
            Why Choose us
          </h1>
        </div>
        <CardSection />
      </Container>
    <div className=" bg-[#0B3B2E] mt-18 p-8">
  <Container className="flex flex-col sm:flex-row justify-around items-center gap8">
    
    
    <div className="flex flex-col gap-2 text-center sm:text-left">
      <h1>CALL TO ACTION</h1>
      <h1 className="text-2xl font-bold">Book Your Next Journey with Ease</h1>
    </div>

    
    <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
      
  
      <div className="flex items-center justify-center border border-lime-400 rounded-full w-16 h-16">
        <Phone size={35} className="text-lime-400" />
      </div>

     
      <div className="flex flex-col items-center sm:items-start gap-1">
        <h1>CALL US ANYTIME</h1>
        <h1 className="text-2xl font-bold">(+250)780396766</h1>
      </div>
        </div>

     
      <Link
        href="#contact"
        className="flex items-center gap-2 border border-lime-400 rounded-full px-4 py-2 text-sm hover:bg-lime-50 transition"
      >
        <ThumbsUp  className="text-lime-400" />
        <h1 className="text-lg">Contact Us</h1>
      </Link>
  
  </Container>
 
</div>
 <Contact/>  
 <Container>
  <h1  className="text-center text-3xl font-bold mb-18 mt-18">Your next move</h1>
     <div className="mb-8 bg-gradient-to-r from-[#0B3B2E] to-lime-700 rounded-md">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 p-8">
            {popularRoutes.map((route, index) => (
              <div key={index}>
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-bold text-white text-lg">
                      {route.from} --- {route.to}
                    </h3>
                    <p className="text-black">{route.buses}+ buses daily</p>
                  </div>
                  <Button>
                    <Link href="/">view schedules</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
 </Container>
 
 

    </div>
  );
};

export default Hero;
