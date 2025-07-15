"use client";

import {useState} from "react";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/Dialog";

import {Input} from "@/components/ui/inputField";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import {useCreateRoute} from "@/hooks/useRoutes";
import {toast} from "sonner";


const routeSchema = z.object({
  startLocation: z.string().min(1, "Start location is required"),
  endLocation: z.string().min(1, "End location is required"),
  distance: z.number().min(0),
  price: z.number().min(0),
  travelTime: z
      .string()
      .regex(/^PT(?:\d+H)?(?:\d+M)?$/, "Travel time must be in ISO-8601 format like PT2H30M"),
});

type RouteFormData = z.infer<typeof routeSchema>;

export function AddRouteForm() {
  const [open, setOpen] = useState(false);
  const { mutateAsync: createRoute, isPending } = useCreateRoute();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RouteFormData>({
    resolver: zodResolver(routeSchema),
    defaultValues: {
      startLocation: "",
      endLocation: "",
      distance: 0,
      price: 0,
      travelTime: "",
    },
  });

  const onSubmit = async (data: RouteFormData) => {
    try {
      await createRoute(data);
      reset();
    } catch (error) {
      console.error("Error while adding route:", error);
      toast.error("Error while adding route");
    }
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

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="startLocation">From</Label>
              <Input id="startLocation" {...register("startLocation")} />
              {errors.startLocation && (
                  <p className="text-sm text-red-600">{errors.startLocation.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="endLocation">To</Label>
              <Input id="endLocation" {...register("endLocation")} />
              {errors.endLocation && (
                  <p className="text-sm text-red-600">{errors.endLocation.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="distance">Distance (km)</Label>
              <Input type="number" step="0.1" {...register("distance", { valueAsNumber: true })} />
              {errors.distance && (
                  <p className="text-sm text-red-600">{errors.distance.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Price (RWF)</Label>
              <Input type="number" {...register("price", { valueAsNumber: true })} />
              {errors.price && <p className="text-sm text-red-600">{errors.price.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="travelTime">Travel Time</Label>
              <Input
                  placeholder="e.g. PT2H30M"
                  {...register("travelTime")}
              />
              {errors.travelTime && (
                  <p className="text-sm text-red-600">{errors.travelTime.message}</p>
              )}
            </div>

            <AlertDialogFooter>
              <AlertDialogCancel type="button">Cancel</AlertDialogCancel>
              <Button type="submit" disabled={isPending}>Add Route</Button>
            </AlertDialogFooter>
          </form>
        </AlertDialogContent>
      </AlertDialog>
  );
}
