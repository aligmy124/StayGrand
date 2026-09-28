import { apiFetch } from "@/lib/api/apiFetch";
import type {
  DeleteBooking,
  IGetBookingResponse,
  IGetBookingsResponse,
  IPagination,
} from "../types/type.booking";

export async function getBookingsService(
  options: IPagination = {}
): Promise<IGetBookingsResponse> {
  const { page = 1, size = 10 } = options;

  const queryParams = new URLSearchParams();
  if (page) queryParams.set("page", page.toString());
  if (size) queryParams.set("size", size.toString());

  return apiFetch<IGetBookingsResponse>(
    `/admin/booking?${queryParams.toString()}`,
    { auth: true }
  );
}

export const viewBookingAdminService = async (id: string) => {
  return apiFetch<IGetBookingResponse>(`/admin/booking/${id}`, {
    auth: true,
  });
};

export const deleteBookingAdminService = async (id: string) => {
  return apiFetch<DeleteBooking>(`/admin/booking/${id}`, {
    method: "DELETE",
    auth: true,
  });
};