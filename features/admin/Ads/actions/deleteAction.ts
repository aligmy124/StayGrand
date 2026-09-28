"use server"
import { revalidatePath } from "next/cache";
import { deleteAdsService } from "../services/ads.service";

export interface DeleteRoomState {
  success: boolean;
  message?: string;
}
export async function deleteAction(
  adsId: string,
  prevState: DeleteRoomState,
  formData: FormData,
): Promise<DeleteRoomState> {
  try {
    const res = await deleteAdsService(adsId);
    revalidatePath("/dashboard/ads");
    return {
      success: true,
      message: "Ads deleted successfully",
    };
  } catch (error) {
    console.error("Delete error:", error);

    return {
      success: false,
      message: error instanceof Error ? error.message : "Delete failed",
    };
  }
}
