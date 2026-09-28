import { apiFetch } from "@/lib/api/apiFetch";
import { RoomQuery, RoomResponse, RoomsResponse } from "../types/types";
import { cacheLife } from "next/cache";
import { cacheTag } from "next/cache";
export async function getRooms(options: RoomQuery = {}) {

  const { page = 1, size = 10, startDate, endDate } = options;

  const params = new URLSearchParams({
    page: String(page),
    size: String(size),
  });

  const dateRange = startDate && endDate;

  if (dateRange) {
    params.set("startDate", startDate);
    params.set("endDate", endDate);
  }

  const endpoint = `/portal/rooms/available?${params.toString()}`;
  return apiFetch<RoomsResponse>(endpoint, { auth: false });
}

export async function singleRoom(id:string) {
  "use cache"
  cacheLife("hours");
  cacheTag("room-details")
  return apiFetch<RoomResponse>(`/portal/rooms/${id}`, { auth: false });
}
