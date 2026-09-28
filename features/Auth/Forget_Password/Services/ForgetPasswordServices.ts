import { apiFetch } from "@/lib/api/apiFetch";
import { ForgetPasswordRequest, ForgetPasswordResponse } from "../Types/Types";

export async function forgetPasswordServices(data: ForgetPasswordRequest): Promise<ForgetPasswordResponse> {
  return apiFetch<ForgetPasswordResponse>("/portal/users/forgot-password", {
    method: "POST",
    body: JSON.stringify(data),
  });
}