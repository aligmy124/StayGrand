"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import React from "react";
import { BookingFormData, BookingSchema } from "../schema/schema";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateBookingTypes } from "../types/types";
import { bookingAction } from "../action/book.action";
import { toast } from "sonner";
import { CalendarDays, Check, Loader2 } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useRouter } from "next/navigation";
import Confirmation from "@/features/payment/components/Confirmation";

interface BookingFormProps {
  roomId: string;
  price: number;
  discount: number;
  isAuthenticated: boolean;
}

export default function BookingForm({
  roomId,
  price,
  discount,
  isAuthenticated,
}: BookingFormProps) {
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    control,
  } = useForm<BookingFormData>({
    resolver: zodResolver(BookingSchema),
  });

  const startDate = watch("startDate");
  const endDate = watch("endDate");

  const router = useRouter();

  const [openCalendar, setOpenCalendar] = React.useState<
    "start" | "end" | null
  >(null);

  const discountPrice = discount > 0 ? price - (price * discount) / 100 : price;

  const nights =
    startDate && endDate
      ? Math.ceil(
          (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
        )
      : 0;

  const subtotal = nights * discountPrice;
  const taxes = Math.round(subtotal * 0.14);
  const totalPrice = subtotal + taxes;

  const handleBooking = async (data: BookingFormData) => {
    if (!isAuthenticated) {
      const params = new URLSearchParams({
        startDate: data.startDate.toISOString(),
        endDate: data.endDate.toISOString(),
      });

      const redirectUrl = `${window.location.pathname}?${params.toString()}`;

      router.push(`/login?redirect=${encodeURIComponent(redirectUrl)}`);

      return;
    }

    try {
      const bookingData: CreateBookingTypes = {
        startDate: data.startDate.toISOString().split("T")[0],
        endDate: data.endDate.toISOString().split("T")[0],
        totalPrice: totalPrice.toString(),
        room: roomId,
      };

      const result = await bookingAction(bookingData);

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success(result.message);
      console.log("*****PAYMENT RESULT*****", result);

     router.push(`/portal/payment/${result.booking?._id}`);
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="rounded-2xl border bg-background p-5 shadow-sm">
      {/* Price */}
      <div className="mb-5">
        <div className="flex items-end gap-2">
          <span className="text-2xl font-bold">
            ${discountPrice.toFixed(2)}
          </span>

          {discount > 0 && (
            <>
              <span className="mb-0.5 text-sm text-muted-foreground line-through">
                ${price.toFixed(2)}
              </span>

              <span className="mb-0.5 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                {discount}% off
              </span>
            </>
          )}
        </div>

        <p className="text-sm text-muted-foreground">per night</p>
      </div>

      {/* {!isAvailable && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
          This room is currently unavailable.
        </div>
      )} */}

      <form onSubmit={handleSubmit(handleBooking)} className="space-y-4">
        {/* Dates */}
        <div className="grid grid-cols-2 rounded-xl border">
          {/* Check-in */}
          <Controller
            control={control}
            name="startDate"
            render={({ field }) => (
              <Popover
                open={openCalendar === "start"}
                onOpenChange={(open) => setOpenCalendar(open ? "start" : null)}
              >
                <PopoverTrigger>
                  <button
                    type="button"
                    className="w-full border-r px-4 py-3 text-left transition hover:bg-muted/50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <div className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase text-muted-foreground">
                      <CalendarDays className="h-3.5 w-3.5" />
                      Check-in
                    </div>

                    <div
                      className={
                        field.value
                          ? "text-sm font-medium"
                          : "text-sm text-muted-foreground"
                      }
                    >
                      {field.value
                        ? format(field.value, "MMM dd, yyyy")
                        : "Select date"}
                    </div>
                  </button>
                </PopoverTrigger>

                <PopoverContent
                  align="start"
                  side="bottom"
                  className="w-auto p-0"
                >
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={(date) => {
                      field.onChange(date);
                      setOpenCalendar("end");
                    }}
                    disabled={{ before: new Date() }}
                  />
                </PopoverContent>
              </Popover>
            )}
          />

          {/* Check-out */}
          <Controller
            control={control}
            name="endDate"
            render={({ field }) => (
              <Popover
                open={openCalendar === "end"}
                onOpenChange={(open) => setOpenCalendar(open ? "end" : null)}
              >
                <PopoverTrigger>
                  <button
                    type="button"
                    className="w-full px-4 py-3 text-left transition hover:bg-muted/50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <div className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase text-muted-foreground">
                      <CalendarDays className="h-3.5 w-3.5" />
                      Check-out
                    </div>

                    <div
                      className={
                        field.value
                          ? "text-sm font-medium"
                          : "text-sm text-muted-foreground"
                      }
                    >
                      {field.value
                        ? format(field.value, "MMM dd, yyyy")
                        : "Select date"}
                    </div>
                  </button>
                </PopoverTrigger>

                <PopoverContent
                  align="end"
                  side="bottom"
                  className="w-auto p-0"
                >
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={(date) => {
                      field.onChange(date);
                      setOpenCalendar(null);
                    }}
                    disabled={{
                      before: startDate || new Date(),
                    }}
                  />
                </PopoverContent>
              </Popover>
            )}
          />
        </div>

        {/* Errors */}
        {(errors.startDate || errors.endDate) && (
          <div className="text-sm text-destructive">
            {errors.startDate?.message || errors.endDate?.message}
          </div>
        )}

        {/* Price breakdown */}
        {nights > 0 && (
          <div className="space-y-3 border-t pt-4 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">
                ${discountPrice.toFixed(2)} × {nights}{" "}
                {nights === 1 ? "night" : "nights"}
              </span>

              <span>${subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-muted-foreground">Taxes (14%)</span>
              <span>${taxes.toFixed(2)}</span>
            </div>

            <div className="flex justify-between border-t pt-3 text-base font-bold">
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
          </div>
        )}

        {/* Submit */}

        <Button
          type="submit"
          disabled={isSubmitting || nights <= 0}
          className="h-12 w-full rounded-xl text-base font-semibold"
          aria-label="Booking Room"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Booking...
            </>
          ) : (
            <>
              <Check className="mr-2 h-4 w-4" />
              Reserve this room
            </>
          )}
        </Button>

        <p className="text-center text-xs text-muted-foreground">
          You won't be charged yet
        </p>
      </form>
    </div>
    
  );
}
