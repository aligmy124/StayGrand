import { apiFetch } from "@/lib/api/apiFetch";
import { ResetRequest, ResetResponse } from "../Types/Types";

export async function resetServices(data: ResetRequest): Promise<ResetResponse>{
  return apiFetch<ResetResponse>("/portal/users/reset-password", {
    method: "POST",
    body: JSON.stringify(data),
  });
}