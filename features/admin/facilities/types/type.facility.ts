interface BaseResponse {
  success: boolean;
  message: string;
}

export interface IFacilityCreatedBy {
  _id: string;
  userName: string;
}

export interface IFacility {
  _id: string;
  name: string;
  createdBy: IFacilityCreatedBy;
  createdAt: string;
  updatedAt: string;
}

export interface IGetFacilitiesResponse extends BaseResponse {
  data: {
    facilities: IFacility[];
    totalCount: number;
  };
}

export interface IGetFacilityResponse extends BaseResponse {
  data: {
    facility: IFacility;
  };
}

export interface ICreateFacilityResponse extends BaseResponse {
  data: {
    facility: IFacility;
  };
}

export interface IUpdateFacilityResponse extends BaseResponse {
  data: {
    facility: IFacility;
  };
}

export interface DeleteFacility extends BaseResponse {
  data: {
    acknowledged: boolean;
    deletedCount: number;
  };
}

export interface IPagination {
  page?: number;
  size?: number;
}

export interface CreateFacilityPayload {
  name: string;
}