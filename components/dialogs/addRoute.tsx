"use client";

import { useState } from "react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/Dialog";
import { Input } from "@/components/ui/inputField";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface Route {
  id: string;
  from: string;
  to: string;
  priceRwf: number;
  travelTime: string;
  distance: string;
}

export function AddRouteForm({ onAddRoute }: { onAddRoute: (route: Route) => void; }) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    priceRwf: 0,
    travelTime: "",
    distance: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "priceRwf" ? Number(value) : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newRoute: Route = {
      id: `route-${Date.now()}`,
      from: formData.from,
      to: formData.to,
      priceRwf: formData.priceRwf,
      travelTime: formData.travelTime,
      distance: formData.distance,
    };
    onAddRoute(newRoute);
    setFormData({
      from: "",
      to: "",
      priceRwf: 0,
      travelTime: "",
      distance: "",
    });
    setOpen(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          className="h-10 flex items-center px-4 py-2 text-white bg-[#1EA17E] hover:bg-green-700 rounded-full text-sm font-medium transition-colors whitespace-nowrap"
        >
          Add Route<span className="ml-1 text-xl leading-none">＋</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Add New Route</AlertDialogTitle>
          <AlertDialogDescription>
            Fill in the details to create a new route.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="from">From</Label>
            <Input
              id="from"
              name="from"
              value={formData.from}
              onChange={handleChange}
              placeholder="e.g. Kigali"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="to">To</Label>
            <Input
              id="to"
              name="to"
              value={formData.to}
              onChange={handleChange}
              placeholder="e.g. Kampala"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="priceRwf">Price (RWF)</Label>
            <Input
              id="priceRwf"
              name="priceRwf"
              type="number"
              value={formData.priceRwf}
              onChange={handleChange}
              placeholder="e.g. 20000"
              required
              min="0"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="travelTime">Travel Time</Label>
            <Input
              id="travelTime"
              name="travelTime"
              value={formData.travelTime}
              onChange={handleChange}
              placeholder="e.g. 9h 50min"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="distance">Distance</Label>
            <Input
              id="distance"
              name="distance"
              value={formData.distance}
              onChange={handleChange}
              placeholder="e.g. 120 km"
              required
            />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction type="submit">Add Route</AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}