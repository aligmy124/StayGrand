"use server";

import { ApiError } from "@/lib/api-error/ApiError";
import { updateRoomSchema } from "../schema/updateRoom.schema";
import { updateRoomAdminService } from "../services/room.service";
import { revalidatePath } from "next/cache";

export const updateRoomAction = async (id: string, formData: FormData) => {
  try {
    const parsedData = {
      roomNumber: formData.get("roomNumber") as string,
      price: formData.get("price") as string,
      discount: formData.get("discount") as string,
      capacity: formData.get("capacity") as string,
      facilities: formData.getAll("facilities[]") as string[],
    };

    const result = updateRoomSchema.safeParse(parsedData);

    if (!result.success) {
      return {
        success: false,
        message: "Invalid form data",
        fieldErrors: result.error.flatten().fieldErrors,
      };
    }

    
    const response = await updateRoomAdminService(id, formData);

    revalidatePath("/admin/dashboard/rooms");

    return {
      success: true,
      message: "Room updated successfully",
      room: response,
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
      message: "Unexpected error occurred",
    };
  }
};