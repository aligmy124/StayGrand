import AdsHeaders from "@/features/admin/Ads/components/AdsHeaders";
import AdsTable from "@/features/admin/Ads/components/AdsTable";
import { AdsService } from "@/features/admin/Ads/services/ads.service";
import AdsTableSkeleton from "@/Shared/Components/admin/AdsTableSkeleton";
import Pagination from "@/Shared/Components/Pagination";
import React, { Suspense } from "react";

interface AdsProps {
  searchParams: Promise<{
    page?: string;
    size?: string;
  }>;
}

async function AdsContent({ searchParams }: AdsProps) {
  const { page, size } = await searchParams;
  const pageNumber = Number(page);
  const currentPage =
    Number.isInteger(pageNumber) && pageNumber > 0 ? pageNumber : 1;
  const sizeNumber = Number(size);
  const currentSize =
    Number.isInteger(sizeNumber) && sizeNumber > 0 ? sizeNumber : 10;
    
  const ads = await AdsService({
    page: currentPage,
    size: currentSize,
  });
  const totalCount = ads?.data?.totalCount ?? 0;
  const totalPages = Math.ceil(totalCount / currentSize);

  return (
    <>
      <AdsHeaders />
      <AdsTable ads={ads.data.ads} />
      <Pagination page={currentPage} totalPages={totalPages} />
    </>
  );
}
export default async function Ads({ searchParams }: AdsProps) {
  return (
    <>
      <Suspense fallback={<AdsTableSkeleton />}>
        <AdsContent searchParams={searchParams} />
      </Suspense>
    </>
  );
}
