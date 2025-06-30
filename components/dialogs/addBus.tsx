
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


export default function AddBusForm() {
  const [form, setForm] = useState({
    busNumber: "",
    route: "",
    driverName: "",
    driverPhone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    console.log("New Bus Added:", form);
   
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
       <Button className="flex items-center px-4 py-2 text-white bg-[#1EA17E] hover:bg-green-700 rounded-full text-sm font-medium transition-colors">
          Add Bus
          <span className="ml-1 text-xl leading-none">＋</span>
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Add New Bus</AlertDialogTitle>
          <AlertDialogDescription>Enter the details to register a new bus.</AlertDialogDescription>
        </AlertDialogHeader>

        <div className="space-y-4 mt-4">
          <div className="space-y-1">
            <Label htmlFor="busNumber" >Bus Number</Label>
            <Input id="busNumber" name="busNumber" value={form.busNumber} onChange={handleChange} />
          </div>

          <div className="space-y-1">
            <Label htmlFor="route" >Route</Label>
            <Input id="route" name="route" value={form.route} onChange={handleChange} />
          </div>

          <div className="space-y-1">
            <Label htmlFor="driverName">Driver Name</Label>
            <Input id="driverName" name="driverName" value={form.driverName} onChange={handleChange} />
          </div>

          <div className="space-y-1">
            <Label htmlFor="driverPhone" >Driver Phone</Label>
            <Input id="driverPhone" name="driverPhone" value={form.driverPhone} onChange={handleChange} />
          </div>
        </div>

        <AlertDialogFooter className="mt-6">
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleSubmit}>Add Bus</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}