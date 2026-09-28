import { apiFetch } from "@/lib/api/apiFetch";
import { FavoriteRoomsResponse, RoomID } from "../types/types";
import { RemoveFavoriteRoomResponse } from "../types/type.delete";

export async function addToFavourite(roomId:string) {
    return apiFetch<RoomID>("/portal/favorite-rooms",{
        method: "POST",
        body: JSON.stringify({roomId})
    })
}
export async function getFavoriteRooms() {
  return apiFetch<FavoriteRoomsResponse>("/portal/favorite-rooms");
}

export async function removeFromFavourite(
  roomId: string,
  favoriteId: string
) {
  return apiFetch<RemoveFavoriteRoomResponse>(`/portal/favorite-rooms/${favoriteId}`, {
    method: "DELETE",
    body: JSON.stringify({ roomId }),
  });
}