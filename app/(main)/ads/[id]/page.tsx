import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { viewPortalAdService } from "@/features/portal/Ads/services/ads.service";
import AdDetails from "@/features/portal/Ads/components/AdDetails";
import { AdDetailsSkeleton } from "@/features/portal/Ads/components/AdsSkeleton";
/* ============ Types ============ */
interface Props {
  params: Promise<{ id: string }>;
}

/* ============ Metadata ============ */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { id } = await params;
    const response = await viewPortalAdService(id);
    const ad = response?.data?.ads;

    if (!ad) {
      return {
        title: "Ad Not Found",
        description: "The requested ad could not be found.",
        robots: { index: false, follow: false },
      };
    }

    const roomNumber = ad.room?.roomNumber ?? "Unknown";
    const title = `Special Offer — Room ${roomNumber}`;
    const description = `Save ${ad.room.discount}% on Room ${roomNumber}. ${
      ad.room.capacity
    } guests · $${ad.room.price}/night.`;
    const images = ad.room?.images?.length ? [ad.room.images[0]] : [];

    return {
      title,
      description,
      alternates: {
        canonical: `/ads/${id}`,
      },
      openGraph: {
        title,
        description,
        type: "website",
        url: `/ads/${id}`,
        images,
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images,
      },
      robots: {
        index: true,
        follow: true,
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

/* ============ Data ============ */
async function AdContent({ params }: Props) {
  const { id } = await params;

  try {
    const response = await viewPortalAdService(id);
    const ad = response?.data?.ads;

    if (!ad) {
      notFound();
    }

    return <AdDetails ad={ad} />;
  } catch (error) {
    console.error("Failed to fetch ad:", error);
    notFound();
  }
}

/* ============ Page ============ */
export default function AdDetailsPage({ params }: Props) {
  return (
    <main className="min-h-screen bg-[#F7F8F5] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <Suspense fallback={<AdDetailsSkeleton />}>
          <AdContent params={params} />
        </Suspense>
      </div>
    </main>
  );
}