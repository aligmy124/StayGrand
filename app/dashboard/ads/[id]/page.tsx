import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import AdsDetails from "@/features/admin/Ads/components/AdsDetails";
import { adsServiceId } from "@/features/admin/Ads/services/ads.service";

/* ============ Types ============ */
interface AdsIdPageProps {
  params: Promise<{ id: string }>;
}

/* ============ Metadata ============ */
export async function generateMetadata({
  params,
}: AdsIdPageProps): Promise<Metadata> {
  try {
    const { id } = await params;
    const response = await adsServiceId(id);
    const ad = response?.data?.ads;

    if (!ad) {
      return {
        title: "Ad Not Found",
        description: "The requested ad could not be found.",
        robots: { index: false, follow: false },
      };
    }

    const roomNumber = ad.room?.roomNumber ?? "Unknown";
    const title = `Ad for Room ${roomNumber}`;
    const description = `Manage ad for room ${roomNumber}. ${
      ad.isActive ? "Currently active." : "Currently inactive."
    }`;

    return {
      title,
      description,
      robots: {
        index: false,
        follow: false,
      },
      openGraph: {
        title,
        description,
        type: "website",
        images: ad.room?.images?.length ? [ad.room.images[0]] : [],
      },
      twitter: {
        card: "summary",
        title,
        description,
      },
    };
  } catch {
    return {
      title: "Ad Not Found",
      description: "The requested ad could not be found.",
      robots: { index: false, follow: false },
    };
  }
}

/* ============ Skeleton ============ */
function AdsDetailsSkeleton() {
  return (
    <div className="space-y-4">
      {/* Image skeleton */}
      <div className="aspect-[16/8] min-h-[280px] w-full animate-pulse rounded-3xl bg-[#F4F6F2] sm:aspect-[21/8]" />

      {/* Meta cards */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="h-20 animate-pulse rounded-2xl bg-[#F4F6F2]"
          />
        ))}
      </div>

      {/* Actions */}
      <div className="h-16 animate-pulse rounded-2xl bg-[#F4F6F2]" />

      {/* Footer */}
      <div className="h-20 animate-pulse rounded-2xl bg-[#F4F6F2]" />
    </div>
  );
}

/* ============ Data ============ */
async function AdsDetailsContent({ params }: AdsIdPageProps) {
  const { id } = await params;

  try {
    const response = await adsServiceId(id);
    const ad = response?.data?.ads;

    if (!ad) {
      notFound();
    }

    return <AdsDetails ads={ad} />;
  } catch (error) {
    console.error("Failed to fetch ad:", error);
    notFound();
  }
}

/* ============ Page ============ */
export default function AdsId({ params }: AdsIdPageProps) {
  return (
    <Suspense fallback={<AdsDetailsSkeleton />}>
      <AdsDetailsContent params={params} />
    </Suspense>
  );
}