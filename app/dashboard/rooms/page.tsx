import RoomHeader from "@/features/admin/rooms/components/RoomHeader";
import RoomsTable from "@/features/admin/rooms/components/RoomsTable";
import { getRoomsService } from "@/features/admin/rooms/services/room.service";
import RoomsTableSkeleton from "@/Shared/Components/admin/RoomsTableSkeleton";
import Pagination from "@/Shared/Components/Pagination";
import { Suspense } from "react";

interface RoomsPageProps {
  searchParams: Promise<{
    page?: string;
    size?: string;
  }>;
}

async function RoomsContent({ searchParams }: RoomsPageProps) {
  const { page, size } = await searchParams;
  const pageNumber = Number(page);
  const currentPage =
    Number.isInteger(pageNumber) && pageNumber > 0 ? pageNumber : 1;
  const sizeNumber = Number(size);
  const currentSize =
    Number.isInteger(sizeNumber) && sizeNumber > 0 ? sizeNumber : 10;
  const rooms = await getRoomsService({ page: currentPage, size: currentSize });
  const totalCount = rooms?.data?.totalCount ?? 0;
  const totalPages = Math.ceil(totalCount / currentSize);

  return (
    <>
      <RoomHeader rooms={rooms.data.rooms} totalCount={totalCount} />
      <RoomsTable rooms={rooms.data.rooms} />
      <Pagination page={currentPage} totalPages={totalPages} />
    </>
  );
}

export default function RoomsPage({ searchParams }: RoomsPageProps) {
  return (
    <div className="space-y-6">
      <Suspense
        fallback={
          <>
            <div className="mb-6 space-y-4">
              <div className="h-20 rounded-2xl bg-[#F4F6F2] animate-pulse" />
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
