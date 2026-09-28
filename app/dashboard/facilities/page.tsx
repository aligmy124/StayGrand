import { Suspense } from "react";
import Pagination from "@/Shared/Components/Pagination";
import { getFacilitiesService } from "@/features/admin/facilities/services/facility.service";
import FacilityHeader from "@/features/admin/facilities/components/FacilityHeader";
import FacilitiesTable from "@/features/admin/facilities/components/FacilitiesTable";

interface FacilitiesPageProps {
  searchParams: Promise<{ page?: string; size?: string }>;
}

async function FacilitiesContent({ searchParams }: FacilitiesPageProps) {
  const { page, size } = await searchParams;
  const pageNumber = Number(page);
  const currentPage =
    Number.isInteger(pageNumber) && pageNumber > 0 ? pageNumber : 1;
  const sizeNumber = Number(size);
  const currentSize =
    Number.isInteger(sizeNumber) && sizeNumber > 0 ? sizeNumber : 10;

  const facilities = await getFacilitiesService({
    page: currentPage,
    size: currentSize,
  });
  const totalCount = facilities?.data?.totalCount ?? 0;
  const totalPages = Math.ceil(totalCount / currentSize);

  return (
    <>
      <FacilityHeader
        facilities={facilities.data.facilities}
        totalCount={totalCount}
      />
      <FacilitiesTable facilities={facilities.data.facilities} />
      <Pagination page={currentPage} totalPages={totalPages} />
    </>
  );
}

export default function FacilitiesPage({ searchParams }: FacilitiesPageProps) {
  return (
    <div className="space-y-6">
      <Suspense
        fallback={
          <>
            <div className="mb-6 space-y-4">
              <div className="h-20 animate-pulse rounded-2xl bg-[#F4F6F2]" />
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-20 animate-pulse rounded-2xl bg-[#F4F6F2]"
                  />
                ))}
              </div>
            </div>
            <div className="h-96 animate-pulse rounded-2xl bg-[#F4F6F2]" />
          </>
        }
      >
        <FacilitiesContent searchParams={searchParams} />
      </Suspense>
    </div>
  );
}