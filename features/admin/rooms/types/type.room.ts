
interface BaseResponse {
  success: boolean;
  message: string;
}

export interface IGetRoomsResponse extends BaseResponse {
  data: {
    rooms: IRoom[];
    totalCount: number;
  };
}

export interface IGetRoomResponse extends BaseResponse {
  data: {
    room: IRoom;
  };
}

export interface IRoom {
  _id: string;
  roomNumber: string;
  price: number;
  capacity: number;
  discount: number;
  facilities: IFacility[];
  createdBy: ICreatedBy;
  images: string[];
  createdAt: string;
  updatedAt: string;
}

export interface IFacility {
  _id: string;
  name: string;
}

export interface ICreatedBy {
  _id: string;
  userName: string;
}

export interface IPagination {
  page?: number;
  size?: number;
}

export interface DeleteRoom extends BaseResponse {
  data: {
    acknowledged: boolean;
    deletedCount: number;
  };
}

export interface UpdateRoomResponse extends BaseResponse {
  data: {
    room: IRoom;
  };
}

export interface UpdateFormDataRoom {
  roomNumber: string;
  price: string;
  discount: string;
  capacity: string;
  imgs: string[];
  facilities: string[];
}

export interface IFacilitiesResponse extends BaseResponse {
  data: {
    facilities: IFacility[];
  };
}