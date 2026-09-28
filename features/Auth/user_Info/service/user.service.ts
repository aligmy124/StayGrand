import { cache } from "react";
import { decodeJwt } from "jose";
import { getToken } from "@/lib/cookies/cookies";
import { apiFetch } from "@/lib/api/apiFetch";

type JwtPayload = {
  _id?: string;
};

type CurrentUserResponse = {
  success: boolean;
  message: string;
  data: {
    user: {
      _id: string;
      userName: string;
      email: string;
      phoneNumber: number;
      country: string;
      role: string;
      profileImage: string | null;
      verified: boolean;
      createdAt: string;
      updatedAt: string;
    };
  };
};

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
     console.log('API Response:', response);
    return response.data.user;
  } catch {
    return null;
  }
});
