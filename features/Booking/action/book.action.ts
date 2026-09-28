"use server";

import { ApiError } from "@/lib/api-error/ApiError";
import { CreateBookingTypes } from "../types/types";
import { createBooking } from "../service/booking.service";
import { CreateBookingSchema } from "../schema/schema";
import { getToken } from "@/lib/cookies/cookies";

export async function bookingAction(data: CreateBookingTypes) {
  const token = await getToken();

  if (!token) {
    return {
      success: false,
      message: "User not authenticated. Please login first.",
    };
  }

  const result = CreateBookingSchema.safeParse(data);

  if (!result.success) {
    return {
      success: false,
      message: "Invalid data",
      fieldErrors: result.error.flatten().fieldErrors,
    };
  }

  try {
    const response = await createBooking(result.data);

    return {
      success: true,
      message: "Booking created successfully",
      booking: response.data.booking,
    };
  } catch (error) {
    if (error instanceof ApiError) {
      return {
        success: false,
        message: error.message || "Failed to create booking",
        fieldErrors: error.fieldErrors,
      };
    }

    return {
      success: false,
      message: "Failed to create booking",
    };
  }
}