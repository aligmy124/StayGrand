interface BaseResponse {
  success: boolean;
  message: string;
}

export type BookingStatus = "pending" | "completed" | "cancelled" | "confirmed";

export interface IBookingUser {
  _id: string;
  userName: string;
}

export interface IBookingRoom {
  _id: string;
  roomNumber: string;
}

export interface IBooking {
  _id: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  user: IBookingUser;
  room: IBookingRoom;
  status: BookingStatus;
  createdAt: string;
  updatedAt: string;
  stripeChargeId?: string;
}

export interface IGetBookingsResponse extends BaseResponse {
  data: {
    booking: IBooking[];
    totalCount: number;
  };
}

export interface IGetBookingResponse extends BaseResponse {
  data: {
    booking: IBooking;
  };
}

export interface IPagination {
  page?: number;
  size?: number;
}

export interface DeleteBooking extends BaseResponse {
  data: {
    acknowledged: boolean;
    deletedCount: number;
  };
}