"use client";

import SearchBar from "./searchBar";
import { useEffect, useState } from "react";
import avatar from "@/public/images/avatar.png";
import { Bell } from "lucide-react";
import Image from "next/image";
import { getGreeting } from "@/utils/getGreeting";
import {useUser} from "@/context/userContext";

const Greeting = () => {
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    setGreeting(getGreeting());
  }, []);

  return (
    <h1 className="text-lg md:text-xl font-semibold text-gray-800 ">
      {greeting}, welcome back!
    </h1>
  );
};

const Topsection = () => {
  const {user} = useUser();
  return (
    <>
      <div className="w-full mb-8 flex flex-col items-center justify-between  gap-4">
        <div className="w-full flex items-center justify-between">
          <Greeting />

          <div className="flex items-center gap-2 shrink-0 order-2 md:order-3">
            <button className="p-2 rounded-full bg-gray-200 hover:bg-gray-100 transition-colors">
              <Bell size={20} className="text-gray-600" />
            </button>

            <div className="flex items-center gap-2 bg-gray-200 hover:bg-gray-200 rounded-full pl-2 pr-3 py-1 transition-colors cursor-pointer">
              <Image
                src={avatar}
                className="w-8 h-8 rounded-full object-cover border border-gray-200"
                alt="User avatar"
              />
              <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
                {user?.fullName}
              </span>
            </div>
          </div>
        </div>

        <div className="w-full lg:max-w-2xl order-3 md:order-2 lg:px-4">
          <SearchBar />
        </div>
      </div>
    </>
  );
};

export default Topsection;
