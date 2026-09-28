"use server";

import { revalidatePath } from "next/cache";
import {
  addToFavourite,
  removeFromFavourite,
} from "../service/favourite.service";

type FavouriteState = {
  success: boolean;
  message: string;
  action?: "add" | "remove";
};

export async function toggle_favourite(
  roomId: string,
  favoriteId: string | null,
  prevState: FavouriteState,
  formData: FormData,
): Promise<FavouriteState> {
  try {
    const isFavourite = formData.get("isFavourite") === "true";

    if (isFavourite) {
      if (!favoriteId) {
        return {
          success: false,
          message: "Favourite not found",
        };
      }

      const res = await removeFromFavourite(roomId, favoriteId);

      revalidatePath(`/rooms/${roomId}`);
      revalidatePath("/favorites");

      return {
        success: res.success,
        message: res.message,
        action: "remove",
      };
    }

    await addToFavourite(roomId);

    revalidatePath(`/rooms/${roomId}`);
    revalidatePath("/favorites");

    return {
      success: true,
      message: "Added to favourites",
      action: "add",
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to update favourite",
    };
  }
}