"use server";

import { ApiError } from "@/lib/api-error/ApiError";
import { revalidatePath } from "next/cache";
import { deleteFacilityAdminService } from "../services/facility.service";

export interface DeleteFacilityState {
  success: boolean;
  message?: string;
}

export async function deleteFacilityAction(
  facilityId: string,
  prevState: DeleteFacilityState,
  formData: FormData,
): Promise<DeleteFacilityState> {
  try {
    await deleteFacilityAdminService(facilityId);
    revalidatePath("/dashboard/facilities");
    return { success: true, message: "Facility deleted successfully" };
  } catch (error) {
    if (error instanceof ApiError) {
      return { success: false, message: error.message };
    }
    return {
      success: false,
      message: error instanceof Error ? error.message : "Delete failed",
    };
  }
}
