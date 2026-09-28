import type { Metadata } from "next";
import { Suspense } from "react";
import CardRoom from "@/features/portal/rooms/Components/explore/CardRoom";
import { getRooms } from "@/features/portal/rooms/services/roome.service";
import Container from "@/Shared/Components/Container";
import Pagination from "@/Shared/Components/Pagination";
import { SkeletonRoom } from "@/Shared/Components/SkeletonRoom";
import CardRoomSkeleton from "@/Shared/Components/CardRoomSkeleton";

/* ============ Metadata ============ */
export const metadata: Metadata = {
  title: "Explore Rooms",
  description:
    "Browse our collection of comfortable rooms. Filter by dates, compare prices, and book your perfect stay.",
  alternates: {
    canonical: "/rooms",
  },
  openGraph: {
    title: "Explore Rooms",
    description:
      "Browse our collection of comfortable rooms. Filter by dates, compare prices, and book your perfect stay.",
    type: "website",
    url: "/rooms",
  },
  twitter: {
    card: "summary_large_image",
    title: "Explore Rooms",
    description: "Browse our collection of comfortable rooms.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

/* ============ Types ============ */
interface Props {
  searchParams: Promise<{
    page?: string;
    startDate?: string;
    endDate?: string;
  }>;
}

/* ============ Data ============ */
async function ExploreRoom({ searchParams }: Props) {
  const { page, startDate, endDate } = (await searchParams) ?? {};
  const pageNumber = Number(page);
  const currentPage =
    Number.isInteger(pageNumber) && pageNumber > 0 ? pageNumber : 1;
  const size = 9;

  const rooms = await getRooms({
    page: currentPage,
    size,
    startDate,
    endDate,
  });

  const totalPages = Math.ceil((rooms?.data?.totalCount ?? 0) / size);

  return (
    <>
      <CardRoom rooms={rooms.data.rooms} />
      {totalPages > 1 && (
        <Pagination page={currentPage} totalPages={totalPages} />
      )}
    </>
  );
}

/* ============ Page ============ */
export default async function Explore({ searchParams }: Props) {
  return (
    <Container className="py-8">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight text-[#303530] sm:text-4xl">
          Explore Rooms
        </h1>

        <p className="mt-2 text-sm text-[#8A9189]">
          Find the perfect room for your next stay.
        </p>
      </header>

      <Suspense fallback={<CardRoomSkeleton />}>
        <ExploreRoom searchParams={searchParams} />
      </Suspense>
    </Container>
  );
}
