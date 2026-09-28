import BookingHeader from "@/features/admin/bookings/components/BookingHeader";
import BookingsTable from "@/features/admin/bookings/components/BookingsTable";
import { getBookingsService } from "@/features/admin/bookings/services/booking.service";
import BookingsTableSkeleton from "@/Shared/Components/admin/BookingsTableSkeleton";
import Pagination from "@/Shared/Components/Pagination";
import { Suspense } from "react";

interface BookingsPageProps {
  searchParams: Promise<{
    page?: string;
    size?: string;
  }>;
}

async function BookingsContent({ searchParams }: BookingsPageProps) {
  const { page, size } = await searchParams;
  const pageNumber = Number(page);
  const currentPage =
    Number.isInteger(pageNumber) && pageNumber > 0 ? pageNumber : 1;
  const sizeNumber = Number(size);
  const currentSize =
    Number.isInteger(sizeNumber) && sizeNumber > 0 ? sizeNumber : 10;

  const bookings = await getBookingsService({
    page: currentPage,
    size: currentSize,
  });

  const totalCount = bookings?.data?.totalCount ?? 0;
  const totalPages = Math.ceil(totalCount / currentSize);

  return (
    <>
      <BookingHeader bookings={bookings.data.booking} totalCount={totalCount} />
      <BookingsTable bookings={bookings.data.booking} />
      <Pagination page={currentPage} totalPages={totalPages} />
    </>
  );
}

export default function BookingsPage({ searchParams }: BookingsPageProps) {
  return (
    <div className="space-y-6">
      <Suspense fallback={<BookingsTableSkeleton />}>
        <BookingsContent searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
