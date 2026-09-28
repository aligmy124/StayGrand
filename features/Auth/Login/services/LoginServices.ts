import { apiFetch } from "@/lib/api/apiFetch";
import { LoginRequset, LoginResponse } from "../types/type";
export async function loginServices(data: LoginRequset): Promise<LoginResponse> {
  return apiFetch<LoginResponse>("/portal/users/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
}