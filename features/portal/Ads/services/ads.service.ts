import { apiFetch } from "@/lib/api/apiFetch";
import type {
  IGetAdResponse,
  IGetAdsResponse,
  IPagination,
} from "../types/ads.type";

export async function getPortalAdsService(
  options: IPagination = {},
): Promise<IGetAdsResponse> {
  const { page = 1, size = 12 } = options;

  const queryParams = new URLSearchParams();
  if (page) queryParams.set("page", page.toString());
  if (size) queryParams.set("size", size.toString());

  return apiFetch<IGetAdsResponse>(`/portal/ads?${queryParams.toString()}`, {
    auth: true,
  });
}

export const viewPortalAdService = async (id: string) => {
  return apiFetch<IGetAdResponse>(`/portal/ads/${id}`, {
    auth: true,
  });
};
