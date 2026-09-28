import { apiFetch } from "@/lib/api/apiFetch";
import type { IGetUsersResponse, IPagination } from "../types/type.user";

export async function getUsersService(
  options: IPagination = {}
): Promise<IGetUsersResponse> {
  const { page = 1, size = 10 } = options;

  const queryParams = new URLSearchParams();
  if (page) queryParams.set("page", page.toString());
  if (size) queryParams.set("size", size.toString());

  return apiFetch<IGetUsersResponse>(
    `/admin/users?${queryParams.toString()}`,
    { auth: true }
  );
}