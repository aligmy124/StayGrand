"use server";

import { revalidatePath } from "next/cache";
import { deleteRoomAdminService } from "../services/room.service";

export interface DeleteRoomState {
  success: boolean;
  message?: string;
}

export async function deleteAction(
  roomId: string,
  prevState: DeleteRoomState,
  formData: FormData
): Promise<DeleteRoomState> {
  try {
    await deleteRoomAdminService(roomId);

    revalidatePath("/dashboard/rooms");

    return {
      success: true,
      message: "Room deleted successfully",
    };
  } catch (error) {
    console.error("Delete error:", error);

    return {
      success: false,
      message: error instanceof Error ? error.message : "Delete failed",
    };
  }
}