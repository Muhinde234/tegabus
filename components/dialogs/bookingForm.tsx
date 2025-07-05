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
import { Button } from "../ui/button";
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

type BookingFormProps = {
  mode: "add" | "edit";
  initialData?: {
    name: string;
    route: string;
    seats: number;
    date: string;
  };
};

export function BookingFormDialog({ mode, initialData }: BookingFormProps) {
  const [form, setForm] = useState({
    name: initialData?.name || "",
    route: initialData?.route || "",
    seats: initialData?.seats?.toString() || "",
    date: initialData?.date || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    console.log(mode === "add" ? "Creating booking" : "Updating booking", form);
  
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="flex items-center px-4 py-2  bg-[#1EA17E] hover:bg-green-700 rounded-full text-sm font-medium transition-colors">
          {mode === "add" ? "Add Booking" : "Edit Booking"}
          <span className="ml-1 text-xl leading-none">＋</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{mode === "add" ? "Add New Booking" : "Edit Booking"}</AlertDialogTitle>
          <AlertDialogDescription>
            Fill out the form to {mode === "add" ? "add a new booking" : "edit this booking"}.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="space-y-4 mt-4">
          <div className="space-y-1">
            <Label htmlFor="name" >Passenger Name</Label>
            <Input id="name" name="name" value={form.name} onChange={handleChange} />
          </div>

          <div className="space-y-1">
            <Label htmlFor="route" >Route</Label>
            <Input id="route" name="route" value={form.route} onChange={handleChange} />
          </div>

          <div className="space-y-1">
            <Label htmlFor="seats" >Seats</Label>
            <Input
              id="seats"
              name="seats"
              type="number"
              value={form.seats}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="date" >Date</Label>
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
          <AlertDialogCancel >Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleSubmit}  className={cn(buttonVariants({ variant: "default" }) )}>
            {mode === "add" ? "Create Booking" : "Update Booking"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
