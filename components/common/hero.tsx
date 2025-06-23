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
    <div className="mt-28">
      {/* Hero Section */}
      <div className="w-full bg-gray-100 py-16">
        <Container>
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            {/* Text Content */}
            <div className="w-full lg:w-1/2 space-y-6">
              <h1 className="text-5xl font-extrabold leading-tight text-gray-900">
                Book Your Journey in Minutes
              </h1>
              <p className="text-lg text-gray-700">
                Experience the convenience of modern travel with our fast, secure, and
                user-friendly online bus ticket booking system. Whether you're commuting
                daily or planning a long-distance trip, enjoy flexible scheduling,
                instant seat reservations, and real-time updates — all from the comfort
                of your device.
              </p>
              <div className="flex flex-wrap gap-4 mt-6">
                <Button>
                  <Link href="/">View Schedules</Link>
                </Button>
                <Link
                  href="/about"
                  className="border border-[#0B3B2E] text-[#0B3B2E] rounded-full py-2 px-4 font-medium hover:bg-[#0B3B2E] hover:text-white transition"
                >
                  Learn More
                </Link>
              </div>
            </div>

            {/* Image */}
            <div className="w-full lg:w-1/2">
              <Image
                src={Bus}
                alt="Bus"
                className="w-full h-auto rounded-xl shadow-lg object-cover"
                priority
              />
            </div>
          </div>
        </Container>
      </div>

      {/* Booking Form */}
      <Container>
        <div className="bg-white -mt-10 mb-16 border border-lime-700 shadow-lg rounded-xl p-4 sm:p-6 md:p-8 flex flex-col sm:flex-row flex-wrap items-center justify-between gap-4">
          <select className="w-full sm:w-[48%] md:w-[23%] border border-lime-700 p-3 rounded-lg focus:outline-none focus:ring-2">
            <option>Start Location</option>
          </select>

          <select className="w-full sm:w-[48%] md:w-[23%] border border-lime-700 p-3 rounded-lg focus:outline-none focus:ring-2">
            <option>End Location</option>
          </select>

          <input
            type="date"
            className="w-full sm:w-[48%] md:w-[23%] border border-lime-700 p-3 rounded-lg focus:outline-none focus:ring-2"
            defaultValue="2025-05-25"
          />

          <div className="w-full sm:w-[48%] md:w-auto">
            <Link href="/login">
              <button className="w-full md:w-[160px] h-[48px] text-white bg-lime-700 rounded-lg hover:bg-lime-800 transition">
                Find Schedules
              </button>
            </Link>
          </div>
        </div>
      </Container>

      {/* Trip Stats */}
      <TripCard trips="500K+" rating={4.9} departures="99%" />

      {/* Why Choose Us */}
      <Container>
        <div className="text-center mt-20 mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            Why Choose Us
          </h2>
        </div>
        <CardSection />
      </Container>

      {/* Call to Action */}
      <div className="bg-[#0B3B2E] mt-20 py-12 text-white">
        <Container className="flex flex-col sm:flex-row items-center justify-between gap-10 text-center sm:text-left">
          {/* CTA Text */}
          <div>
            <h3 className="uppercase text-sm tracking-wide">Call to Action</h3>
            <h1 className="text-2xl sm:text-3xl font-bold mt-2">
              Book Your Next Journey with Ease
            </h1>
          </div>

          {/* Phone Info */}
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center border border-lime-400 rounded-full w-16 h-16">
              <Phone size={30} className="text-lime-400" />
            </div>
            <div className="text-left">
              <p className="text-sm">Call us anytime</p>
              <h4 className="text-xl font-bold">(+250) 780 396 766</h4>
            </div>
          </div>

          {/* Contact Button */}
          <Link
            href="#contact"
            className="flex items-center gap-2 border border-lime-400 rounded-full px-5 py-2 text-sm font-semibold hover:bg-lime-50 text-white hover:text-[#0B3B2E] transition"
          >
            <ThumbsUp className="text-lime-400" />
            Contact Us
          </Link>
        </Container>
      </div>

      {/* Contact Form */}
      <Contact />

      {/* Popular Routes */}
      <Container>
        <h2 className="text-center text-3xl font-bold mt-20 mb-10">Your Next Move</h2>
        <div className="mb-20 bg-gradient-to-r from-[#0B3B2E] to-lime-700 rounded-xl shadow-lg">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 p-8">
            {popularRoutes.map((route, index) => (
              <div key={index}>
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-white text-lg">
                      {route.from} — {route.to}
                    </h3>
                    <p className="text-lime-200">{route.buses}+ buses daily</p>
                  </div>
                  <Button>
                    <Link href="/">View</Link>
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
