"use server";

import { ApiError } from "@/lib/api-error/ApiError";
import { revalidatePath } from "next/cache";
import { deleteBookingAdminService } from "../services/booking.service";

export interface DeleteBookingState {
  success: boolean;
  message?: string;
}

export async function deleteBookingAction(
  bookingId: string,
  prevState: DeleteBookingState,
  formData: FormData
): Promise<DeleteBookingState> {
  try {
    await deleteBookingAdminService(bookingId);

    revalidatePath("/admin/dashboard/bookings");

    return {
      success: true,
      message: "Booking deleted successfully",
    };
  } catch (error) {
    if (error instanceof ApiError) {
      return { success: false, message: error.message };
    }
    return {
      success: false,
      message: error instanceof Error ? error.message : "Delete failed",
    };
  }
}