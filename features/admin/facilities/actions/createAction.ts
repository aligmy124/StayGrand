"use server";

import { ApiError } from "@/lib/api-error/ApiError";
import { revalidatePath } from "next/cache";
import { createFacilitySchema } from "../schema/createFacility.schema";
import { createFacilityAdminService } from "../services/facility.service";

export interface CreateFacilityState {
  success: boolean;
  message: string;
  fieldErrors?: Record<string, string[]>;
  facility?: any;
}

export const createFacilityAction = async (
  formData: FormData
): Promise<CreateFacilityState> => {
  try {
    const parsedData = {
      name: (formData.get("name") as string)?.trim(),
    };

    const result = createFacilitySchema.safeParse(parsedData);

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

    const response = await createFacilityAdminService(result.data);

    if (!response.success) {
      return { success: false, message: response.message };
    }

    revalidatePath("/dashboard/facilities");

    return {
      success: true,
      message: response.message ?? "Facility created successfully",
      facility: response.data.facility,
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