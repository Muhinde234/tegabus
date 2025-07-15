"use client";

import {useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/Dialog";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form";
import {Input} from "@/components/ui/inputField";
import {Button} from "@/components/ui/button";
import {useCreateBus} from "@/hooks/useBuses";
import {toast} from "sonner";

const busSchema = z.object({
  plateNumber: z
      .string()
      .min(1, "Plate number is required")
      .regex(
          /^[A-Z]{3}\s\d{3}\s[A-Z]$/,
          'Plate number must follow the format "ABC 123 D" (three letters, space, three digits, space, one letter)',
      ),
});

export default function AddBusForm() {
  const createBus = useCreateBus();
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof busSchema>>({
    resolver: zodResolver(busSchema),
    defaultValues: {
      plateNumber: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof busSchema>) => {
    try {
      await createBus.mutateAsync(data);
      toast.success("Bus created successfully");
      form.reset();
      setOpen(false);
    } catch (error) {
      toast.success("Failed to create bus");
    }
  };

  return (
      <AlertDialog open={open} onOpenChange={setOpen}>
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

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
              <FormField
                  control={form.control}
                  name="plateNumber"
                  render={({ field }) => (
                      <FormItem>
                        <FormLabel>Plate Number</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="e.g., ABC-1234" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                  )}
              />

              <AlertDialogFooter className="mt-6">
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <Button type="submit" disabled={createBus.isPending}>
                  {createBus.isPending ? "Adding..." : "Add Bus"}
                </Button>
              </AlertDialogFooter>
            </form>
          </Form>
        </AlertDialogContent>
      </AlertDialog>
  );
}