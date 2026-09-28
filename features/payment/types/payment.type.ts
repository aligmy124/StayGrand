export interface CardData {
  cardNumber: string;
  expiry: string;
  cvc: string;
}

export interface IBookingPaymentResponse {
  success: boolean;
  message: string;
  data: {
    booking: IBooking;
  };
}

interface IBooking {
  _id: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  user: string;
  room: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  createdAt: string;
  updatedAt: string;
  stripeChargeId: string;
}