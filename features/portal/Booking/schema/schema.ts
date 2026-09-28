import { z } from "zod";

export const BookingSchema = z.object({
  startDate: z.date({
    error: "Please select check-in date",
  }),

  endDate: z.date({
    error: "Please select check-out date",
  }),
});

export type BookingFormData = z.infer<typeof BookingSchema>;

export const CreateBookingSchema = z.object({
  startDate: z.string(),
  endDate: z.string(),
  totalPrice: z.string(),
  room: z.string(),
});