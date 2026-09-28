"use server";

import { ApiError } from "@/lib/api-error/ApiError";
import { revalidatePath } from "next/cache";
import { payBookingService } from "../services/payment.service";
export interface PayActionState {
  success: boolean;
  message: string;
  data?: any;
}

export const payBookingAction = async (
  bookingId: string,
  token: string
): Promise<PayActionState> => {
  if (!token) {
    return { success: false, message: "Payment token is missing" };
  }

  try {
    const response = await payBookingService(bookingId, token);

    if (!response.success) {
      return { success: false, message: response.message};  
    }

    revalidatePath("/dashboard/bookings");

    return {
      success: true,
      message: response.message ?? "Payment completed successfully",
      data: response.data,
    };
  } catch (error) {
    if (error instanceof ApiError) {
      return { success: false, message: error.message };
    }
    return {
      success: false,
      message: error instanceof Error ? error.message : "Payment failed",
    };
  }
};