import { apiFetch } from "@/lib/api/apiFetch";
import type { IGetDashboardResponse } from "../types/type.dashboard";

export const getDashboardService = async () => {
  return apiFetch<IGetDashboardResponse>("/admin/dashboard", {
    auth: true,
  });
};