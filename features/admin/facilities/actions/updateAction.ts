"use server";

import { ApiError } from "@/lib/api-error/ApiError";
import { revalidatePath } from "next/cache";
import { updateFacilitySchema } from "../schema/updateFacility.schema";
import { updateFacilityAdminService } from "../services/facility.service";

export interface UpdateFacilityState {
  success: boolean;
  message: string;
  fieldErrors?: Record<string, string[]>;
}

export const updateFacilityAction = async (
  id: string,
  formData: FormData
): Promise<UpdateFacilityState> => {
  try {
    const parsedData = {
      name: (formData.get("name") as string)?.trim(),
    };

    const result = updateFacilitySchema.safeParse(parsedData);

    if (!result.success) {
      return {
        success: false,
        message: "Invalid form data",
        fieldErrors: result.error.flatten().fieldErrors as Record<
          string,
          string[]
        >,
      };
    }

    const response = await updateFacilityAdminService(id, result.data);

    if (!response.success) {
      return { success: false, message: response.message };
    }

    revalidatePath("/dashboard/facilities");

    return {
      success: true,
      message: response.message ?? "Facility updated successfully",
    };
  } catch (error) {
    if (error instanceof ApiError) {
      return {
        success: false,
        message: error.message,
        fieldErrors: error.fieldErrors as any,
      };
    }
    return { success: false, message: "Unexpected error occurred" };
  }
};