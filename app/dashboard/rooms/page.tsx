import type { Metadata } from "next";
import { Suspense } from "react";
import RoomHeader from "@/features/admin/rooms/components/RoomHeader";
import RoomsTable from "@/features/admin/rooms/components/RoomsTable";
import { getRoomsService } from "@/features/admin/rooms/services/room.service";
import RoomsTableSkeleton from "@/Shared/Components/admin/RoomsTableSkeleton";
import Pagination from "@/Shared/Components/Pagination";

/* ============ Metadata ============ */
export const metadata: Metadata = {
  title: "Rooms Management",
  description:
    "Manage all rooms. Create, edit, and organize rooms, pricing, capacity, and facilities.",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Rooms Management",
    description:
      "Manage all rooms. Create, edit, and organize rooms, pricing, capacity, and facilities.",
    type: "website",
  },
};

/* ============ Types ============ */
interface RoomsPageProps {
  searchParams: Promise<{
    page?: string;
    size?: string;
  }>;
}

/* ============ Data ============ */
async function RoomsContent({ searchParams }: RoomsPageProps) {
  const { page, size } = await searchParams;

  const pageNumber = Number(page);
  const sizeNumber = Number(size);

  const currentPage =
    Number.isInteger(pageNumber) && pageNumber > 0 ? pageNumber : 1;

  const currentSize =
    Number.isInteger(sizeNumber) && sizeNumber > 0 && sizeNumber <= 100
      ? sizeNumber
      : 10;

  const rooms = await getRoomsService({
    page: currentPage,
    size: currentSize,
  });

  const totalCount = rooms?.data?.totalCount ?? 0;
  const totalPages = Math.max(1, Math.ceil(totalCount / currentSize));

  return (
    <>
      <RoomHeader rooms={rooms.data.rooms} totalCount={totalCount} />
      <RoomsTable rooms={rooms.data.rooms} />
      {totalPages > 1 && (
        <Pagination page={currentPage} totalPages={totalPages} />
      )}
    </>
  );
}

/* ============ Page ============ */
export default function RoomsPage({ searchParams }: RoomsPageProps) {
  return (
    <div className="space-y-6">
      <Suspense
        fallback={
          <>
            <div className="mb-6 space-y-4">
              <div className="h-20 animate-pulse rounded-2xl bg-[#F4F6F2]" />
            </div>
            <RoomsTableSkeleton />
          </>
        }
      >
        <RoomsContent searchParams={searchParams} />
      </Suspense>
    </div>
  );
}