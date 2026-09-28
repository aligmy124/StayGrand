interface BaseResponse {
  success: boolean;
  message: string;
}

export interface IAdsFacility {
  _id: string;
  name: string;
}

export interface IAdsRoom {
  _id: string;
  roomNumber: string;
  price: number;
  capacity: number;
  discount: number;
  facilities: string[] | IAdsFacility[];
  createdBy: string | { _id: string; userName: string };
  images: string[];
  createdAt: string;
  updatedAt: string;
}

export interface IAdsCreatedBy {
  _id: string;
  userName: string;
}

export interface IAds {
  _id: string;
  isActive: boolean;
  room: IAdsRoom;
  createdBy: IAdsCreatedBy;
  createdAt: string;
  updatedAt: string;
}

export interface IGetAdsResponse extends BaseResponse {
  data: {
    ads: IAds[];
    totalCount: number;
  };
}

export interface IGetAdResponse extends BaseResponse {
  data: {
    ads: IAds;
  };
}

export interface IPagination {
  page?: number;
  size?: number;
}