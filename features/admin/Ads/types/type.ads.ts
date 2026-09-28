import { ICreatedBy, IRoom } from "../../rooms/types/type.room";

export interface BaseAdminResponse {
  success: boolean;
  message: string;
}

export interface Ads {
  _id: string;
  isActive: boolean;
  room: IRoom;
  createdBy: ICreatedBy;
}
export interface AdsResponse extends BaseAdminResponse {
  data: {
    ads: Ads[];
    totalCount: number;
  };
}
export interface SingleAdsResponse extends BaseAdminResponse {
  data: {
    ads: Ads;
  };
}

export interface AdsOptions {
  page: number;
  size: number;
}

export interface UpdateAdsOptions {
  discount: number;
  isActive: boolean;
}

// create room
export interface ICreateAdsResponse extends BaseAdminResponse {
  data: {
    ads: IAds;
  };
}

export interface IAds {
  _id: string;
  room: string;
  createdBy: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}