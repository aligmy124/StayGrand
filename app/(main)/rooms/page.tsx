import CardRoom from "@/features/rooms/Components/explore/CardRoom";
import { getRooms } from "@/features/rooms/services/roome.service";
import Container from "@/Shared/Components/Container";
import Pagination from "@/Shared/Components/Pagination";
import { SkeletonRoom } from "@/Shared/Components/SkeletonRoom";
import { Suspense } from "react";

interface Props {
  searchParams: Promise<{
    page: string;
    startDate: string;
    endDate: string;
  }>;
}

async function ExploreRoom({ searchParams }: Props) {
  const { page, startDate, endDate } = (await searchParams) ?? {};
  const pageNumber = Number(page);
  const currentPage =
    Number.isInteger(pageNumber) && pageNumber > 0 ? pageNumber : 1;
  const size = 9;

  const rooms = await getRooms({
    page: currentPage,
    size: size,
    startDate: startDate,
    endDate: endDate,
  });
  const totalPages = Math.ceil((rooms?.data?.totalCount ?? 0) / size);

  return (
    <>
      <CardRoom rooms={rooms.data.rooms} />
      <Pagination page={currentPage} totalPages={totalPages} />
    </>
  );
}

export default async function Explore({ searchParams }: Props) {
  return (
    <Container className="py-8">
      {/* <ExploreRoomsHeaders/> */}
      <Suspense fallback={<SkeletonRoom />}>
        <ExploreRoom searchParams={searchParams} />
      </Suspense>
    </Container>
  );
}
