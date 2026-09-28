import { apiFetch } from "@/lib/api/apiFetch";
import { IBookingPaymentResponse } from "../types/payment.type";

export const payBookingService = async (
  bookingId: string,
  token: string
): Promise<IBookingPaymentResponse> => {
  return apiFetch<IBookingPaymentResponse>(`/portal/booking/${bookingId}/pay`, {
    method: "POST",
    body: JSON.stringify({ token }),
    auth: true,
    headers: { "Content-Type": "application/json" },
  });
};