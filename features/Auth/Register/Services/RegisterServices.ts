import { apiFetch } from "@/lib/api/apiFetch";
import { RegisterResponse } from "../Types/Types";

export async function registerServices(
  formData: FormData
): Promise<RegisterResponse> {
  return apiFetch<RegisterResponse>("/portal/users", {
    method: "POST",
    body: formData,
  });
}