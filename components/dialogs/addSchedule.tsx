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
  
} from "@/components/ui/Dialog";
import { Input } from "@/components/ui/inputField";
import { Button } from "@/components/ui/button";
import {Bus, RouteResponse} from "@/lib/types";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useCreateSchedule} from "@/hooks/useSchedule";
import {toast} from "sonner";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";

const scheduleSchema = z.object({
  busId: z.number().positive("Please select a bus"),
  routeId: z.number().positive("Please select a route"),
  departureTime: z.string().min(1, "Departure time is required"),
  arrivalTime: z.string().min(1, "Arrival time is required"),
  driverName: z.string().min(1, "Driver name is required"),
  driverPhone: z
      .string()
      .min(1, "Driver phone is required")
      .regex(/^\+?\d{10,15}$/, "Invalid phone number format"),
});

interface AddScheduleFormProps {
  buses: Bus[];
  routes: RouteResponse[];
}

export default function AddScheduleForm({ buses, routes }: AddScheduleFormProps) {
  const createSchedule = useCreateSchedule();
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof scheduleSchema>>({
    resolver: zodResolver(scheduleSchema),
    defaultValues: {
      busId: 0,
      routeId: 0,
      departureTime: "",
      arrivalTime: "",
      driverName: "",
      driverPhone: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof scheduleSchema>) => {
    try {
      await createSchedule.mutateAsync(data);
      toast.success("Schedule successfully created");
      form.reset();
      setOpen(false);
    } catch (error) {
      toast.error("Error creating schedule");
    }
  };


  return (
      <AlertDialog open={open} onOpenChange={setOpen}>
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

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
              <FormField
                  control={form.control}
                  name="busId"
                  render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bus</FormLabel>
                        <Select
                            onValueChange={(value) => field.onChange(Number(value))}
                            defaultValue={field.value.toString()}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select a bus" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {buses.map((bus) => (
                                <SelectItem key={bus.id} value={bus.id.toString()}>
                                  {bus.plateNumber || `Bus ${bus.id}`}
                                </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                  )}
              />

              <FormField
                  control={form.control}
                  name="routeId"
                  render={({ field }) => (
                      <FormItem>
                        <FormLabel>Route</FormLabel>
                        <Select
                            onValueChange={(value) => field.onChange(Number(value))}
                            defaultValue={field.value.toString()}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select a route" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {routes.map((route) => (
                                <SelectItem key={route.id} value={route.id.toString()}>
                                  {`${route.startLocation} - ${route.endLocation}`}
                                </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                  )}
              />

              <FormField
                  control={form.control}
                  name="departureTime"
                  render={({ field }) => (
                      <FormItem>
                        <FormLabel>Departure Time</FormLabel>
                        <FormControl>
                          <Input type="datetime-local" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                  )}
              />

              <FormField
                  control={form.control}
                  name="arrivalTime"
                  render={({ field }) => (
                      <FormItem>
                        <FormLabel>Arrival Time</FormLabel>
                        <FormControl>
                          <Input type="datetime-local" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                  )}
              />

              <FormField
                  control={form.control}
                  name="driverName"
                  render={({ field }) => (
                      <FormItem>
                        <FormLabel>Driver Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                  )}
              />

              <FormField
                  control={form.control}
                  name="driverPhone"
                  render={({ field }) => (
                      <FormItem>
                        <FormLabel>Driver Phone</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                  )}
              />

              <AlertDialogFooter className="mt-6">
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <Button type="submit" disabled={createSchedule.isPending}>
                  {createSchedule.isPending ? "Saving..." : "Save Schedule"}
                </Button>
              </AlertDialogFooter>
            </form>
          </Form>
        </AlertDialogContent>
      </AlertDialog>
  );
}