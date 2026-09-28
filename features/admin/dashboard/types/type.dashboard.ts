interface BaseResponse {
  success: boolean;
  message: string;
}

export interface IDashboardData {
  rooms: number;
  facilities: number;
  ads: number;
  bookings: {
    pending: number;
    completed: number;
  };
  users: {
    user: number;
    admin: number;
  };
}

export interface IGetDashboardResponse extends BaseResponse {
  data: IDashboardData;
}