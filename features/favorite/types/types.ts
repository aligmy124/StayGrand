export interface RoomID{
    roomId: string
}

// Room interface
export interface Room {
  _id: string;
  roomNumber: string;
  price: number;
  capacity: number;
  discount: number;
  facilities: string[]; // facility IDs
  createdBy: string;
  images: string[];
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

// User interface
interface User {
  _id: string;
  userName: string;
}

// FavoriteRooms entry
interface FavoriteRoomsEntry {
  _id: string;
  rooms: Room[];
  user: User;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

// Data wrapper
interface FavoriteRoomsData {
  favoriteRooms: FavoriteRoomsEntry[];
  totalCount: number;
}

// Root response
export interface FavoriteRoomsResponse {
  success: boolean;
  message: string;
  data: FavoriteRoomsData;
}
