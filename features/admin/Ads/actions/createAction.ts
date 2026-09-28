"use server";

import { ApiError } from "@/lib/api-error/ApiError";
import { revalidatePath } from "next/cache";
import {CreateAdsInput, createAdsSchema } from "../schema/createAds.schema";
import { createAdsAdminService } from "../services/ads.service";


export const createAdsAction = async (data: CreateAdsInput) => {
  try {
    const result = createAdsSchema.safeParse(data);
    if (!result.success) {
      return {
        success: false,
        message: "Invalid form data",
        fieldErrors: result.error.flatten().fieldErrors,
      };
    }

    const response = await createAdsAdminService(result.data);

    revalidatePath("/dashboard/ads");

    return {
      success: true,
      message: response.message ?? "Ad created successfully",
      ad: response.data.ads,
    };
  } catch (error) {
    if (error instanceof ApiError) {
      return {
        success: false,
        message: "you have already ads with the same room",
        fieldErrors: error.fieldErrors,
      };
    }
    return { success: false, message: "Unexpected error occurred" };
  }
};
