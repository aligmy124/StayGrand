import type { Metadata } from "next";
import { Suspense } from "react";
import BookingHeader from "@/features/admin/bookings/components/BookingHeader";
import BookingsTable from "@/features/admin/bookings/components/BookingsTable";
import { getBookingsService } from "@/features/admin/bookings/services/booking.service";
import BookingsTableSkeleton from "@/Shared/Components/admin/BookingsTableSkeleton";
import Pagination from "@/Shared/Components/Pagination";

/* ============ Metadata ============ */
export const metadata: Metadata = {
  title: "Bookings Management",
  description:
    "Manage all room bookings. View, filter, and update booking statuses in one place.",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Bookings Management",
    description:
      "Manage all room bookings. View, filter, and update booking statuses in one place.",
    type: "website",
  },
};

/* ============ Types ============ */
interface BookingsPageProps {
  searchParams: Promise<{
    page?: string;
    size?: string;
  }>;
}

/* ============ Data ============ */
async function BookingsContent({ searchParams }: BookingsPageProps) {
  const { page, size } = await searchParams;

  const pageNumber = Number(page);
  const sizeNumber = Number(size);

  const currentPage =
    Number.isInteger(pageNumber) && pageNumber > 0 ? pageNumber : 1;

  const currentSize =
    Number.isInteger(sizeNumber) && sizeNumber > 0 && sizeNumber <= 100
      ? sizeNumber
      : 10;

  const bookings = await getBookingsService({
    page: currentPage,
    size: currentSize,
  });

  const totalCount = bookings.data.totalCount ?? 0;
  const totalPages = Math.max(1, Math.ceil(totalCount / currentSize));

  return (
    <>
      <BookingHeader
        bookings={bookings.data.booking}
        totalCount={totalCount}
      />
      <BookingsTable bookings={bookings.data.booking} />
      {totalPages > 1 && (
        <Pagination page={currentPage} totalPages={totalPages} />
      )}
    </>
  );
}

/* ============ Page ============ */
export default function BookingsPage({ searchParams }: BookingsPageProps) {
  return (
    <div className="space-y-6">
      <Suspense fallback={<BookingsTableSkeleton />}>
        <BookingsContent searchParams={searchParams} />
      </Suspense>
    </div>
  );
}