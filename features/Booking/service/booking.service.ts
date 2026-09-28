import { apiFetch } from "@/lib/api/apiFetch";
import { BookingQuery, CreateBookingResponseTypes, CreateBookingTypes, MyBookingsResponse } from "../types/types";
export async function createBooking(booking: CreateBookingTypes) {
    return apiFetch<CreateBookingResponseTypes>("/portal/booking",{
        method: "POST",
        body: JSON.stringify(booking),
    });
}
export async function getMyBookings(options: BookingQuery = {}) {
  const { page = 1, size = 10, status } = options;

  const params = new URLSearchParams({
    page: String(page),
    size: String(size),
  });

  if (status) {
    params.set("status", status);
  }

  const endpoint = `/portal/booking/my?${params.toString()}`;
  return apiFetch<MyBookingsResponse>(endpoint, { auth: true });
}

