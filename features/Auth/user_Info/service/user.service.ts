import { cache } from "react";
import { decodeJwt } from "jose";
import { getToken } from "@/lib/cookies/cookies";
import { apiFetch } from "@/lib/api/apiFetch";
import { CurrentUserResponse, JwtPayload } from "../types/types";



export const getCurrentUser = cache(async () => {
  const token = await getToken();

  if (!token) {
    return null;
  }

  try {
    const payload = decodeJwt(token) as JwtPayload;

    if (!payload._id) {
      return null;
    }

    const response = await apiFetch<CurrentUserResponse>(
      `/portal/users/${payload._id}`,
    );
    
    return response.data.user;
  } catch {
    return null;
  }
});
