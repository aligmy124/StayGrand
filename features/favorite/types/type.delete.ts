// Root response
export interface RemoveFavoriteRoomResponse {
  success: boolean;
  message: string;
  data: {
    favoriteRoom: FavoriteRoom;
  };
}

// Favorite room object
export interface FavoriteRoom {
  _id: string;
  rooms: string[]; // Array of room IDs
  user: string;    // User ID
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}
