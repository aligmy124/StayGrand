"use server";

import { setToken } from "@/lib/cookies/cookies";
import { LoginFormData, LoginSchema } from "../schema/Schema";
import { loginServices } from "../services/LoginServices";
import { ApiError } from "@/lib/api-error/ApiError";

export async function loginAction(data: LoginFormData) {
  const result = LoginSchema.safeParse(data);

  if (!result.success) {
    return {
      success: false,
      message: "Invalid form data",
    };
  }

  try {
    const res = await loginServices(result.data);

    await setToken(res.data.token);
    console.log("login res", res)

    return {
      success: true,
      message: "Login successfully",
      role: res.data.user.role
    };
  } catch (error) {
    if (error instanceof ApiError) {
      switch (error.status) {
        case 404:
          return {
            success: false,
            message: "Invalid email or password",
          };

        case 401:
          return {
            success: false,
            message: "Unauthorized",
          };

        default:
          return {
            success: false,
            message: "Something went wrong",
          };
      }
    }

    return {
      success: false,
      message: "Unexpected error occurred",
    };
  }
}
