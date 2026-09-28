export interface Facility {
  _id: string;
  name: string;
}

interface CreatedBy{
  _id:string,
  userName:string
}

export interface Room {
  _id: string;
  roomNumber: string;
  price: number;
  capacity: number;
  discount: number;
  facilities: Facility[];
  createdBy: CreatedBy;
  images: string[];
  createdAt: string;
  updatedAt: string;
  // isBooked: boolean;
}

interface BaseResponse {
  success: boolean;
  message: string;
}

export interface RoomResponse extends BaseResponse {
  data: {
    room: Room;
  };
}

export interface RoomsResponse extends BaseResponse {
  data: {
    rooms: Room[];
    totalCount: number;
  };
}

export interface RoomQuery {
  page?: number;
  size?: number;
  startDate?: string;
  endDate?: string;
}