"use server"
import { ApiError } from "@/lib/api-error/ApiError";
import { UpdateFormDataAds, UpdateSchema } from "../schema/updateAds.schema";
import { updateAdsService } from "../services/ads.service";
import { revalidatePath } from "next/cache";

export async function UpdateAdsActions(id: string, data: UpdateFormDataAds) {
  const result = UpdateSchema.safeParse(data);
  if (!result.success) {
    return {
      success: false,
      message: "Invalid data",
      fieldErrors: result.error.flatten().fieldErrors,
    };
  }
  try {
    await updateAdsService(id, result.data);
    revalidatePath("/dashboard/ads");
    return {
      success: true,
      message: "The ad has been updated successfully",
    };
  } catch (error) {
    if (error instanceof ApiError) {
      return {
        success: false,
        message: error.message,
        fieldErrors: error.fieldErrors,
      };
    }
    return {
      success: false,
      message: "Something went wrong",
    };
  }
}
