import BookingDetails from "@/features/admin/bookings/components/BookingDetails";
import { viewBookingAdminService } from "@/features/admin/bookings/services/booking.service";
import BookingAdminDetailsSkeleton from "@/Shared/Components/admin/BookingAdminDetailsSkeleton";
import { Suspense } from "react";

interface Props {
  params: Promise<{ id: string }>;
}

async function Booking({ params }: Props) {
  const { id } = await params;
  const booking = await viewBookingAdminService(id);

  return <BookingDetails booking={booking.data.booking} />;
}

export default function BookingDetailsPage({ params }: Props) {
  return (
    <Suspense fallback={<BookingAdminDetailsSkeleton />}>
      <Booking params={params} />
    </Suspense>
  );
}
