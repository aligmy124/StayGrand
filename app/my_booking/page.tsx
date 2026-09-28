import { Suspense } from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { getMyBookings } from "@/features/portal/Booking/service/booking.service";
import MyBookingCard from "@/features/portal/Booking/components/MyBookingCard";
import { BookingsLoading } from "@/Shared/Components/SkeletonBooking";

/* ============ Metadata ============ */
export const metadata: Metadata = {
  title: "My Bookings",
  description:
    "View and manage all your reservations. Track booking status, dates, and details in one place.",
  openGraph: {
    title: "My Bookings",
    description:
      "View and manage all your reservations. Track booking status, dates, and details in one place.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "My Bookings",
    description: "View and manage all your reservations.",
  },
  robots: {
    index: false,
    follow: false,
  },
};

/* ============ Types ============ */
interface BookingsPageProps {
  searchParams: Promise<{
    page?: string;
    status?: "pending" | "confirmed" | "cancelled" | "completed";
  }>;
}

/* ============ Content ============ */
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
      <section aria-label="Your bookings list">
        <MyBookingCard bookings={bookings} />
      </section>
    </>
  );
}

/* ============ Page ============ */
export default function BookingsPage({ searchParams }: BookingsPageProps) {
  return (
    <main className="min-h-screen bg-[#F7F8F5] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-[#4E604F] transition-colors hover:text-[#3F4F40] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4E604F]/30 focus-visible:ring-offset-2 rounded"
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
