import type { Metadata } from "next";
import { Suspense } from "react";
import Pagination from "@/Shared/Components/Pagination";
import { getPortalAdsService } from "@/features/portal/Ads/services/ads.service";
import AdsHeader from "@/features/portal/Ads/components/AdsHeader";
import AdsGrid from "@/features/portal/Ads/components/AdsGrid";
import { AdsGridSkeleton } from "@/features/portal/Ads/components/AdsSkeleton";
import Container from "@/Shared/Components/Container";

/* ============ Metadata ============ */
export const metadata: Metadata = {
  title: "Special Offers",
  description:
    "Discover exclusive deals and promotions on selected rooms. Book now and save more.",
  alternates: {
    canonical: "/ads",
  },
  openGraph: {
    title: "Special Offers",
    description:
      "Discover exclusive deals and promotions on selected rooms. Book now and save more.",
    type: "website",
    url: "/ads",
  },
  twitter: {
    card: "summary_large_image",
    title: "Special Offers",
    description: "Discover exclusive deals on selected rooms.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

/* ============ Types ============ */
interface AdsPageProps {
  searchParams: Promise<{ page?: string; size?: string }>;
}

/* ============ Data ============ */
async function AdsContent({ searchParams }: AdsPageProps) {
  const { page, size } = await searchParams;

  const pageNumber = Number(page);
  const sizeNumber = Number(size);

  const currentPage =
    Number.isInteger(pageNumber) && pageNumber > 0 ? pageNumber : 1;

  const currentSize =
    Number.isInteger(sizeNumber) && sizeNumber > 0 && sizeNumber <= 100
      ? sizeNumber
      : 12;

  const ads = await getPortalAdsService({
    page: currentPage,
    size: currentSize,
  });

  const totalCount = ads?.data?.totalCount ?? 0;
  const totalPages = Math.max(1, Math.ceil(totalCount / currentSize));

  return (
    <>
      <AdsHeader totalCount={totalCount} />
      <AdsGrid ads={ads.data.ads} />
      {totalPages > 1 && (
        <Pagination page={currentPage} totalPages={totalPages} />
      )}
    </>
  );
}

/* ============ Page ============ */
export default function AdsPage({ searchParams }: AdsPageProps) {
  return (
    <Container className="py-8">
        <Suspense fallback={<AdsGridSkeleton />}>
          <AdsContent searchParams={searchParams} />
        </Suspense>
        </Container>

  );
}