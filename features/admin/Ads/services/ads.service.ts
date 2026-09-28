import { apiFetch } from "@/lib/api/apiFetch";
import { AdsOptions, AdsResponse, BaseAdminResponse, ICreateAdsResponse, SingleAdsResponse, UpdateAdsOptions } from "../types/type.ads";

export const AdsService = (options: AdsOptions = { page: 1, size: 10 }) => {
  const { page, size } = options;
  let queryString = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
  }).toString();
  return apiFetch<AdsResponse>(`/admin/ads?${queryString}`);
};

export const adsServiceId = (id:string) => {
  return apiFetch<SingleAdsResponse>(`/admin/ads/${id}`);
};
export const deleteAdsService = (id:string) => {
  return apiFetch<BaseAdminResponse>(`/admin/ads/${id}`,{
    method:"DELETE"
  });
};
export const updateAdsService = (id:string, data: UpdateAdsOptions) => {
  return apiFetch<BaseAdminResponse>(`/admin/ads/${id}`,{
    method:"PUT",
    body:JSON.stringify(data)
  });
};
export const createAdsAdminService = (data: any) => {
  return apiFetch<ICreateAdsResponse>('/admin/ads',{
    method:"POST",
    body:JSON.stringify(data)
  });
};