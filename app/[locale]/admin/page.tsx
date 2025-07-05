"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Bell, MoveDownRight, MoveUpRight } from "lucide-react";
import DashboardCard from "../../../components/dashboard/dashboardCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";

import wallet from "../../public/images/wallet.png";
import trend from "../../public/images/trend.png";
import ticket from "../../public/images/ticket.png";
import person from "../../public/images/person.png";
import image from "../../public/images/image.png";
import avatar from "../../public/images/avatar.png";


import { getGreeting } from "../../../utils/getGreeting";
import BusSchedules from "@/components/dashboard/BusSchedules";
import FlightSchedule from "@/components/dashboard/flightSchedule";
import { Button } from "@/components/ui/button";
import { BookingFormDialog } from "@/components/dialogs/bookingForm";
import AddBusForm from "@/components/dialogs/addBus";
import Map from "@/components/dashboard/map";

const DEFAULT_CENTER: [number, number] = [-1.9499500, 30.0588500]


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

const Dashboard = () => {
  const [timeFrame, setTimeFrame] = useState("monthly");

  const stats = [
    {
      title: "Total earnings",
      value: "120,000 RWF",
      description: "7%",
      color: "orange",
      icon: (
        <MoveUpRight className="inline text-green-600 w-5 h-5 bg-white rounded-full p-1" />
      ),
      image: <Image src={wallet} alt="wallet" className="w-30" />,
    },
    {
      title: "Today's Bookings",
      value: "3,653",
      description: "5%",
      color: "green",
      icon: (
        <MoveUpRight className="inline text-green-600 w-5 h-5 bg-white rounded-full p-1" />
      ),
      image: <Image src={ticket} alt="ticket" className="w-30" />,
    },
    {
      title: "Successful Departures",
      value: "140/220",
      description: "5%",
      color: "indigo",
      icon: (
        <MoveDownRight className="inline text-red-600 w-5 h-5 bg-white rounded-full p-1" />
      ),
      image: <Image src={trend} alt="trending" className="w-30" />,
    },
  ];

  return (
    <div className=" mt-8 mb-4 px-6 bg-white max-h-screen">
      <div className="flex justify-between">
        <Greeting />
        <div className="flex items-center gap-2 shrink-0 order-2 md:order-3 mb-8">
          <Button
            variant="ghost"
            className="p-2 rounded-full bg-gray-200 hover:bg-gray-100 transition-colors"
          >
            <Bell size={20} className="text-gray-600" />
          </Button>

          <div className="flex items-center gap-2 bg-gray-200 hover:bg-gray-200 rounded-full pl-2 pr-3 py-1 transition-colors cursor-pointer">
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

      <div className="flex gap-4 p-4 rounded-sm">
        <div className="w-[75%]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {stats.map((stat, index) => (
              <DashboardCard
                key={index}
                title={stat.title}
                value={stat.value}
                description={stat.description}
                icon={stat.icon}
                image={stat.image}
              />
            ))}
          </div>

          <div className="grid grid-cols-2 gap-12 mt-4 bg-white p-4 rounded-xl">
            <div className="flex justify-between">
              <div className="flex flex-col">
                <p className="text-xl font-medium">Bus List</p>
                <p className="text-gray-600 text-sm">
                  Today's Active Buses 120
                </p>
              </div>

              <Select>
                <SelectTrigger className="w-full sm:w-[48%] md:w-[23%] border border-green-300 p-2 sm:p-3 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500">
                  <SelectValue placeholder="active" />
                </SelectTrigger>
                <SelectContent className="border border-gray-300">
                  <SelectItem value="light">Inactive</SelectItem>
                  <SelectItem value="dark">retired</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-10">
              <Image
                src={avatar}
                alt="driver avatar"
                className="w-10 h-10 inline bg-blue-300 rounded-full"
              />
              <div className="flex flex-col pr-6 border-r border-gray-500">
                <p className="font-bold">IGIRIMPUHWE Dositha</p>
                <p className="text-sm text-gray-600">Driver</p>
              </div>
              <div className="flex flex-col">
                <h1 className="text-xl">Seats</h1>
                <p className="text-gray-600">Fully packed</p>
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <div className="border border-[#C1C1C1] p-4 rounded-lg  flex justify-between">
                <div className="flex flex-col">
                  <h1 className="font-bold">Kigali-Uganda</h1>
                  <p className="text-sm text-gray-400">RAB 240X</p>
                </div>
                <div className="flex gap-2">
                   <div className="flex flex-col font-bold">
                  <h1>KIG</h1>
                  <h1>UGA</h1>
                </div>
                <div className="bg-[#1EA17E] rounded-xl p-2">
            <Image src={image} alt="image" className="" />
                </div>

                </div>
              </div>
              <div className="bg-[#1EA17E] flex justify-between p-4 rounded-lg ">
                <div className="flex flex-col ">
                 <h1 className="font-bold text-black">Kigali-Uganda</h1>
                <p className="text-sm text-white">RAB 240X</p>
                </div>

                  <div className="flex gap-2">
                   <div className="flex flex-col font-bold">
                  <h1>KIG</h1>
                  <h1>UGA</h1>
                </div>
                <div className="bg-black rounded-xl p-2">
            <Image src={image} alt="image" className="" />
                </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <div className="border border-gray-200 flex justify-center items-center h-full relative z-1">
              <Map width={500} height={200} center={DEFAULT_CENTER} zoom={6} className="rounded-lg " />

              </div>
            </div>
          </div>

          <div className="flex justify-between items-center mt-4 rounded-xl shadow-sm bg-white p-8">
            <div className="flex flex-col gap-2">
              <h1 className="font-bold">Recent Bookings</h1>
              <p className="text-sm text-gray-400">Show 10 of 50 bookings</p>
            </div>
            <div className="flex gap-3 items-center">
              <Select value={timeFrame} onValueChange={setTimeFrame}>
                <SelectTrigger className="h-10 w-[120px] border border-green-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500">
                  <SelectValue placeholder="Timeframe" />
                </SelectTrigger>
                <SelectContent className="border border-gray-300">
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
              <BookingFormDialog mode="add" />
            </div>
          </div>
          <BusSchedules />
        </div>

        <div className="w-[30%] group">
          <div className="relative">
            <Image
              src={person}
              alt="person enjoying their journey"
              className="w-full h-auto rounded-lg"
            />
            <div className="absolute bottom-4 left-4 right-4 bg-opacity-70 text-white p-4 rounded-lg flex justify-between items-center">
              <p className="text-sm md:text-base">
                Secure the seat and enjoy your journey!
              </p>
              <MoveUpRight className="w-6 h-6 bg-white rounded-full p-1 text-black group-hover:bg-green-500 group-hover:text-white transition-colors" />
            </div>
          </div>

          <div className="flex justify-between bg-white rounded-xl shadow-lg p-4 mt-4">
            <div className="flex flex-col">
              <p className="text-lg font-medium">Activity</p>
              <p className="text-gray-400 text-sm">
                Today is{" "}
                {new Date().toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>

            <AddBusForm/>
          </div>
          <div>
            <FlightSchedule />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
