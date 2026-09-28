"use server";

import { revalidatePath } from "next/cache";
import {
  addToFavourite,
  removeFromFavourite,
} from "../service/favourite.service";
import { ApiError } from "@/lib/api-error/ApiError";

export type FavouriteState = {
  success: boolean;
  message: string;
  action?: "add" | "remove";
};

export async function add_to_favourite(
  roomId: string,
  prevState: FavouriteState,
  formData: FormData,
): Promise<FavouriteState> {
  if (!roomId) {
    return {
      success: false,
      message: "Invalid room",
    };
  }

  try {
    await addToFavourite(roomId);

    return {
      success: true,
      message: "Added to favourites",
      action: "add",
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to add favourite",
    };
  }
}

export async function remove_from_favourite(
  prevState: { success: boolean; message: string },
  formData: FormData,
) {
  const roomId = formData.get("roomId")?.toString();
  const favoriteId = formData.get("favoriteId")?.toString();

  try {
    const res = await removeFromFavourite(roomId!, favoriteId!);
    revalidatePath(`/rooms/${roomId}`);
    revalidatePath("/favorites");

    return {
      success: res.success,
      message: res.message,
      action: "remove",
    };
  } catch (error) {
   

    if (error instanceof ApiError) {
      return {
        success: false,
        message: error.message,
      };
    }

    return {
      success: false,
      message: "Failed to remove from favourites",
    };
  }
}
