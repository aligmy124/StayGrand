export interface CreateBookingTypes {
  startDate: string;
  endDate: string;
  totalPrice: string;
  room: string;
}

export interface CreateBookingResponseTypes {
  success: boolean;
  message: string;
  data: {
    booking: BookingData;
  };
}

export interface BookingData {
startDate: string;
endDate: string;
  totalPrice: number;
  user: string;
  room: string;
  status: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

/* my bookings */

export interface BookingUser {
  _id: string;
}

export interface Booking {
  _id: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  user: BookingUser;
  room: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  createdAt: string;
  updatedAt: string;
}

export interface MyBookingsResponse {
  success: boolean;
  message: string;
  data: {
    myBooking: Booking[];
    totalCount: number;
  };
}

export interface BookingQuery {
  page?: number;
  size?: number;
  status?: 'pending' | 'confirmed' | 'cancelled' | 'completed';
}
