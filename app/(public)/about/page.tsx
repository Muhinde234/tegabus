import React from "react";
import Head from "next/head";
import { Bus, Clock, Lock, Search, Phone, BadgePercent } from "lucide-react";

const AboutPage: React.FC = () => {
  
  const features = [
    {
      title: "One-Stop Booking",
      desc: "Multiple bus operators in one place.",
      icon: <Bus className="w-10 h-10" />,
    },
    {
      title: "Real-Time Availability",
      desc: "Instant confirmations & live seat tracking.",
      icon: <Clock className="w-10 h-10" />,
    },
    {
      title: "Secure Payments",
      desc: "UPI, cards, wallets, and more.",
      icon: <Lock className="w-10 h-10" />,
    },
    {
      title: "Smart Search",
      desc: "Filters for routes, timings, and amenities.",
      icon: <Search className="w-10 h-10" />,
    },
    {
      title: "24/7 Support",
      desc: "Dedicated help via chat, email, or phone.",
      icon: <Phone className="w-10 h-10" />,
    },
    {
      title: "Exclusive Discounts",
      desc: "Loyalty programs for frequent travelers.",
      icon: <BadgePercent className="w-10 h-10" />,
    },
  ];

  
  const steps = [
    { step: "1", title: "Search", desc: "Enter route, date, and passengers." },
    { step: "2", title: "Compare", desc: "Choose buses, seats, and prices." },
    { step: "3", title: "Book & Pay", desc: "Secure checkout." },
    { step: "4", title: "E-Ticket", desc: "Receive via SMS/email." },
  ];

  return (
    <>
      <Head>
        <title>About Us </title>
        <meta name="description" content="Learn about our mission, features, and how we simplify bus travel." />
      </Head>

      <div className="min-h-screen  bg-gray-50">
        
        <section className="bg-[#0B3B2E] text-white py-20 pt-42  sm:px-6 lg:px-32">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Revolutionizing <span className="text-lime-400">Bus Travel</span>
            </h1>
            <p className="text-xl sm:text-2xl max-w-3xl mx-auto">
              A seamless, centralized platform for booking bus tickets across multiple operators.
            </p>
          </div>
        </section>

      
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#0B3B2E] mb-4">Our Mission</h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                Making bus travel <span className="text-lime-600 font-semibold">convenient, affordable, and hassle-free</span> for everyone.
              </p>
            </div>
          </div>
        </section>

      
        <section className="py-16 bg-white px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-[#0B3B2E] text-center mb-12">
             Our System Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-gray-50 p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow"
                >
                  <div className="text-lime-600 mb-4 flex justify-center">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-[#0B3B2E] mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#0B3B2E] text-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              How It <span className="text-lime-400">Works</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {steps.map((item, index) => (
                <div
                  key={index}
                  className="bg-white/10 p-6 rounded-lg backdrop-blur-sm border border-lime-400/20"
                >
                  <div className="w-12 h-12 bg-lime-500 rounded-full flex items-center justify-center text-xl font-bold text-[#0B3B2E] mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-300">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 border border-lime-500">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-[#0B3B2E] mb-6">
              Ready to Travel Smarter?
            </h2>
            <button className="bg-[#0B3B2E] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#0a3529] transition-colors">
               Booking Now
            </button>
          </div>
        </section>
      </div>
    </>
  );
};

export default AboutPage;