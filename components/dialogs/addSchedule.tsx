"use client";

import { useState } from "react";
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
import { Button } from "@/components/ui/button";

export default function AddScheduleForm() {
  const [form, setForm] = useState({
    busNumber: "",
    route: "",
    departureTime: "",
    arrivalTime: "",
    driverName: "",
    driverPhone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    console.log("Submitting schedule:", form);
    // API call or state update logic here
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="h-10 px-4 py-2 text-white bg-[#1EA17E] hover:bg-green-700 rounded-full text-sm font-medium transition-colors whitespace-nowrap">
          Add Schedule <span className="ml-1 text-xl leading-none">＋</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Add New Schedule</AlertDialogTitle>
          <AlertDialogDescription>
            Fill in the details to schedule a new bus route.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="space-y-4 mt-4">
          <div className="space-y-1">
            <Label htmlFor="busNumber">Bus Number</Label>
            <Input id="busNumber" name="busNumber" value={form.busNumber} onChange={handleChange} />
          </div>
          <div className="space-y-1">
            <Label htmlFor="route">Route</Label>
            <Input id="route" name="route" value={form.route} onChange={handleChange} />
          </div>
          <div className="space-y-1">
            <Label htmlFor="departureTime">Departure Time</Label>
            <Input id="departureTime" name="departureTime" type="time" value={form.departureTime} onChange={handleChange} />
          </div>
          <div className="space-y-1">
            <Label htmlFor="arrivalTime">Arrival Time</Label>
            <Input id="arrivalTime" name="arrivalTime" type="time" value={form.arrivalTime} onChange={handleChange} />
          </div>
          <div className="space-y-1">
            <Label htmlFor="driverName">Driver Name</Label>
            <Input id="driverName" name="driverName" value={form.driverName} onChange={handleChange} />
          </div>
          <div className="space-y-1">
            <Label htmlFor="driverPhone">Driver Phone</Label>
            <Input id="driverPhone" name="driverPhone" value={form.driverPhone} onChange={handleChange} />
          </div>
        </div>

        <AlertDialogFooter className="mt-6">
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleSubmit}>Save Schedule</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}