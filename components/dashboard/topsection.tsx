"use client"

import SearchBar from "../dashboard/searchBar";
import { useEffect, useState } from "react";
import avatar from "../../public/images/avatar.png";
import { Bell } from "lucide-react";
import Image from "next/image";



import { getGreeting } from "../../utils/getGreeting";

const Greeting = () => {
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    setGreeting(getGreeting());
  }, []);

  return (
    <h1 className="text-xl font-semibold text-gray-800 mb-4">
      {greeting}, welcome back!
    </h1>
  );
};
const Topsection = () => {
 

  return (
    <>
      <div className=" mt-8 mb-8 flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
        <h1 className="text-xl font-semibold whitespace-nowrap order-1 md:order-none">
          <Greeting/>
        </h1>

        <div className="w-full md:max-w-2xl order-3 md:order-2 md:px-4">
          <SearchBar />
        </div>

        <div className="flex items-center gap-2 shrink-0 order-2 md:order-3">
          <button className="p-2 rounded-full bg-gray-200 hover:bg-gray-100 transition-colors">
            <Bell size={20} className="text-gray-600" />
          </button>

          <div className="flex items-center gap-2 bg-gray-300 hover:bg-gray-200 rounded-full pl-2 pr-3 py-1 transition-colors cursor-pointer">
            <Image
              src={avatar}
              className="w-8 h-8 rounded-full object-cover border border-gray-200"
              alt="User avatar"
            />
            <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
              Dositha
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Topsection;
