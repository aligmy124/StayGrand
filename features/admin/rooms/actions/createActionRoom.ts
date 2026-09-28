"use server";

import { ApiError } from "@/lib/api-error/ApiError";
import { revalidatePath } from "next/cache";
import { createRoomSchema } from "../schema/createRoom.schema";
import { createRoomAdminService } from "../services/room.service";

export interface CreateRoomActionState {
  success: boolean;
  message: string;
  fieldErrors?: Record<string, string[]>;
  room?: any;
}

export const createRoomAction = async (
  formData: FormData
): Promise<CreateRoomActionState> => {
  try {
    const facilities = formData.getAll("facilities[]") as string[];

    const parsedData = {
      roomNumber: formData.get("roomNumber") as string,
      price: formData.get("price") as string,
      discount: formData.get("discount") as string,
      capacity: formData.get("capacity") as string,
      facilities,
    };

    const result = createRoomSchema.safeParse(parsedData);

    if (!result.success) {
      return {
        success: false,
        message: "Invalid form data",
        fieldErrors: result.error.flatten().fieldErrors
      };
    }

    const response = await createRoomAdminService(formData);

    revalidatePath("/dashboard/rooms");

    return {
      success: true,
      message: "Room created successfully",
      room: response.data.room,
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