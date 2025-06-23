"use client";


import Container from "@/components/ui/container";
import TermsCard from "../../components/termsCard";
import { termsData } from "@/helpers/data";
import Link from "next/link";



export default function TermsPage() {
  return (
    <main className="">
      <section className="bg-[#0B3B2E] text-white py-20 pt-42  sm:px-6 lg:px-32">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-3xl  font-bold mb-6">
              Terms & Conditions  
            </h1>
            <p className=" max-w-3xl mx-auto">
           By accessing and booking through our platform, you agree to be bound by the following terms and conditions.
            </p>
            <p>your journey our priority</p>
          </div>
        </section>
    <Container>
      <h1 className="text-3xl text-center font-bold  mt-18 text-[#0B3B2E]">Our System Policy</h1>
        <div className="grid grid-cols-4 gap-4 mt-18">
        {termsData.map((term) => (
          <TermsCard
            key={term.title}
            title={term.title}
            content={term.content}
            icon={term.icon}
          />
        ))}
      </div>
          <div className="flex justify-center items-center gap-5 mt-18 ">
          <Link href="">
            <button className=" inline bg-[#0B3B2E] text-white rounded-sm px-4 py-2 ">
              Book now
            </button>
          </Link>
          <Link href="/terms">
            <button className="inline border border-[#0B3B2E] rounded-sm px-4 py-2">
              View More
            </button>
          </Link>
          
        </div>
    </Container>
      
    </main>
  );
}
