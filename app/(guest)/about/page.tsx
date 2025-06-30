import React from "react";
import Head from "next/head";
import { steps } from "../../../helpers/data";
import FeatureSection from "@/components/ui/featureSection";
import { Button } from "@/components/ui/button";

const AboutPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>About Us </title>
        <meta
          name="description"
          content="Learn about our mission, features, and how we simplify bus travel."
        />
      </Head>

      <div className="min-h-screen  bg-gray-50">
        <section className="bg-[#0B3B2E] text-white py-20 pt-42  sm:px-6 lg:px-32">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-3xl  font-bold mb-6">
              Revolutionizing <span className="text-lime-400">Bus Travel</span>
            </h1>
            <p className="  max-w-3xl mx-auto">
              A seamless, centralized platform for booking bus tickets across
              multiple operators. passengers can easily find and book bus
              tickets, view schedules, and track their travel. .
            </p>
            <p>your journey our priority</p>
          </div>
        </section>

        <section className="py-20 px-4 sm:px-8 lg:px-16 bg-gradient-to-br from-white via-gray-50 to-lime-50">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
              <div className="bg-white shadow-lg rounded-2xl p-8 text-center border border-lime-300 hover:shadow-2xl transition-all duration-300">
                <h2 className="text-4xl font-extrabold text-[#0B3B2E] mb-4 tracking-tight">
                  Our Mission
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Making bus travel{" "}
                  <span className="text-lime-600 font-semibold">
                    convenient, affordable, and hassle-free
                  </span>{" "}
                  for everyone.
                </p>
              </div>

              <div className="bg-white shadow-lg rounded-2xl p-8 text-center border border-lime-300 hover:shadow-2xl transition-all duration-300">
                <h2 className="text-4xl font-extrabold text-[#0B3B2E] mb-4 tracking-tight">
                  Our Vision
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Empowering communities with a{" "}
                  <span className="text-lime-600 font-semibold">
                    smart, connected, and accessible
                  </span>{" "}
                  transport system.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-[#0B3B2E] text-center mb-12">
              Our System Features
            </h2>
            <FeatureSection />
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

        <section className="py-16 px-4 sm:px-6 lg:px-8 ">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-[#0B3B2E] mb-6">
              Ready to Travel Smarter?
            </h2>
            <Button variant="default" className="bg-[#0B3B2E] text-white rounded-lg font-semibold transition hover:bg-green-700 w-full sm:w-[190px] h-[40px] cursor-pointer py-2 px-2">
              Start Booking Now
            </Button>
            
          </div>
        </section>
      </div>
    </>
  );
};

export default AboutPage;
