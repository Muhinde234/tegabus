"use client";

import { useState } from "react";
import Topsection from "@/components/dashboard/topsection";
import { tickets } from "../../../../helpers/data";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select";
import BusSchedules from "@/components/dashboard/BusSchedules";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/Dialog";
import { Input } from "@/components/ui/inputField";
import { Label } from "@/components/ui/label";

export default function Bookings() {
  const [timeFrame, setTimeFrame] = useState("monthly");


  const [form, setForm] = useState({
    name: "",
    route: "",
    seats: "",
    date: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    console.log("New Booking:", form);

  };

  return (
    <>
      <div>
        <div>
          <Topsection />
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h1 className="text-xl lg:text-2xl font-bold">All Bookings list</h1>
            <p className="text-sm text-gray-500">
              Showing {tickets.length} bookings
            </p>
          </div>

          <div className="flex items-center gap-3">

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" className="flex items-center px-4 py-2 text-white bg-[#1EA17E] hover:bg-green-700 rounded-full text-sm font-medium transition-colors whitespace-nowrap">
                  Add Booking<span className="ml-1 text-xl leading-none">＋</span>
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Add New Booking</AlertDialogTitle>
                  <AlertDialogDescription>
                    Fill out the form to add a new booking.
                  </AlertDialogDescription>
                </AlertDialogHeader>

                <div className="space-y-4 mt-4">
                  <div className="space-y-1">
                    <Label htmlFor="name">Passenger Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="route">Route</Label>
                    <Input
                      id="route"
                      name="route"
                      value={form.route}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="seats">Seats</Label>
                    <Input
                      id="seats"
                      name="seats"
                      type="number"
                      value={form.seats}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      name="date"
                      type="date"
                      value={form.date}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <AlertDialogFooter className="mt-6">
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleSubmit}>
                    Create Booking
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <Select value={timeFrame} onValueChange={setTimeFrame}>
              <SelectTrigger className="w-[100px] border border-green-300 p-2 sm:p-3 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500">
                <SelectValue placeholder="Select timeframe" />
              </SelectTrigger>
              <SelectContent className="border border-gray-300">
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <BusSchedules />
      </div>
    </>
  );
}