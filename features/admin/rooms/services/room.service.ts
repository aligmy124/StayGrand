import { apiFetch } from "@/lib/api/apiFetch";
import type { DeleteRoom, IFacilitiesResponse, IGetRoomResponse, IGetRoomsResponse, IPagination, UpdateFormDataRoom, UpdateRoomResponse } from "../types/type.room";

export async function getRoomsService(
  options: IPagination = {},
): Promise<IGetRoomsResponse> {
  const { page = 1, size = 10 } = options;

  const queryParams = new URLSearchParams();
  if (page) queryParams.set("page", page.toString());
  if (size) queryParams.set("size", size.toString());

  const queryString = queryParams.toString();
  return apiFetch<IGetRoomsResponse>(`/admin/rooms?${queryString}`,{
    auth: true
  });
}

export const viewRoomAdminService = async (id: string) => {
  return apiFetch<IGetRoomResponse>(`/admin/rooms/${id}`,{
    auth: true
  });
}
export const deleteRoomAdminService = async (id: string) => {
  return apiFetch<DeleteRoom>(`/admin/rooms/${id}`,{
    method: "DELETE",
    auth: true
  });
}
export const updateRoomAdminService = async (id: string, formData: FormData) => {
  return apiFetch<UpdateRoomResponse>(`/admin/rooms/${id}`,{
    method: "PUT",
    body: formData,
    auth: true
  });
}
export const createRoomAdminService = async (formData: FormData) => {
  return apiFetch<IGetRoomResponse>("/admin/rooms", {
    method: "POST",
    body: formData,
    auth: true,
  });
};

export const getFacilitiesService = async () => {
  return apiFetch<IFacilitiesResponse>("/admin/room-facilities", {
    auth: true,
  });
};