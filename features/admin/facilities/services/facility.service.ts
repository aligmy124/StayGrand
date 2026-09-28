import { apiFetch } from "@/lib/api/apiFetch";
import type {
  CreateFacilityPayload,
  DeleteFacility,
  ICreateFacilityResponse,
  IGetFacilitiesResponse,
  IGetFacilityResponse,
  IPagination,
  IUpdateFacilityResponse,
} from "../types/type.facility";

export async function getFacilitiesService(
  options: IPagination = {}
): Promise<IGetFacilitiesResponse> {
  const { page = 1, size = 10 } = options;

  const queryParams = new URLSearchParams();
  if (page) queryParams.set("page", page.toString());
  if (size) queryParams.set("size", size.toString());

  return apiFetch<IGetFacilitiesResponse>(
    `/admin/room-facilities?${queryParams.toString()}`,
    { auth: true }
  );
}

export const viewFacilityAdminService = async (id: string) => {
  return apiFetch<IGetFacilityResponse>(`/admin/room-facilities/${id}`, {
    auth: true,
  });
};

export const createFacilityAdminService = async (
  payload: CreateFacilityPayload
) => {
  return apiFetch<ICreateFacilityResponse>("/admin/room-facilities", {
    method: "POST",
    body: JSON.stringify(payload),
    auth: true,
    headers: { "Content-Type": "application/json" },
  });
};

export const updateFacilityAdminService = async (
  id: string,
  payload: CreateFacilityPayload
) => {
  return apiFetch<IUpdateFacilityResponse>(`/admin/room-facilities/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
    auth: true,
    headers: { "Content-Type": "application/json" },
  });
};

export const deleteFacilityAdminService = async (id: string) => {
  return apiFetch<DeleteFacility>(`/admin/room-facilities/${id}`, {
    method: "DELETE",
    auth: true,
  });
};