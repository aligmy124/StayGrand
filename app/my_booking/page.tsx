import { Suspense } from "react";
import { getMyBookings } from "@/features/Booking/service/booking.service";
import Link from "next/link";
import MyBookingCard from "@/features/Booking/components/MyBookingCard";
import { BookingsLoading } from "@/Shared/Components/SkeletonBooking";

interface BookingsPageProps {
  searchParams: Promise<{
    page?: string;
    status?: "pending" | "confirmed" | "cancelled" | "completed";
  }>;
}

/* -------------------------------- */
/* Bookings Data                    */
/* -------------------------------- */

async function BookingsContent({
  searchParams,
}: {
  searchParams: BookingsPageProps["searchParams"];
}) {
  const params = await searchParams;

  const page = Number(params.page) || 1;
  const status = params.status;

  const response = await getMyBookings({
    page,
    size: 10,
    status,
  });

  const bookings = response.data.myBooking;
  const totalCount = response.data.totalCount;

  return (
    <>
      {/* Stats */}
      <div className="mb-6 rounded-2xl border border-[#E5E8E2] bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-[#9AA099]">
              Total Bookings
            </p>

            <p className="mt-1 text-2xl font-bold text-[#303530]">
              {totalCount}
            </p>
          </div>

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F1F4EF]">
            <span className="text-lg text-[#4E604F]">✓</span>
          </div>
        </div>
      </div>

      {/* Bookings */}
      <section>
        <MyBookingCard bookings={bookings} />
      </section>
    </>
  );
}
export default function BookingsPage({ searchParams }: BookingsPageProps) {
  return (
    <main className="min-h-screen bg-[#F7F8F5] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Header renders immediately */}

        <div className="mb-8">
          <Link
            href="/"
            className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-[#4E604F] transition-colors hover:text-[#3F4F40]"
          >
            ← Back to home
          </Link>

          <h1 className="text-3xl font-semibold tracking-tight text-[#303530] sm:text-4xl">
            My Bookings
          </h1>

          <p className="mt-2 text-sm text-[#8A9189]">
            View and manage all your reservations.
          </p>
        </div>

        {/* Data fetching */}
        <Suspense fallback={<BookingsLoading />}>
          <BookingsContent searchParams={searchParams} />
        </Suspense>
      </div>
    </main>
  );
}
