import type { Metadata } from "next";
import { Suspense } from "react";
import { CreateAdsForm } from "@/features/admin/Ads/components/CreateAdsForm";
import { getRoomsService } from "@/features/admin/rooms/services/room.service";
import CreateAdsSkeleton from "@/Shared/Components/admin/CreateAdsSkeleton";

/* ============ Metadata ============ */
export const metadata: Metadata = {
  title: "Create Ad",
  description:
    "Promote a room by creating a new ad. Set the discount and activate the campaign.",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Create Ad",
    description:
      "Promote a room by creating a new ad. Set the discount and activate the campaign.",
    type: "website",
  },
};

/* ============ Data ============ */
async function CreateAdsContent() {
  const roomsResponse = await getRoomsService({ page: 1, size: 100 });
  const rooms = roomsResponse.data.rooms;

  return <CreateAdsForm rooms={rooms} />;
}

/* ============ Page ============ */
export default function CreateAdsPage() {
  return (
    <div className="mx-auto max-w-7xl p-6">
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-[#1B1C1C] sm:text-3xl">
          Create Ad
        </h1>
        <p className="mt-1 text-sm text-[#8A9189]">
          Promote a room by creating a new ad.
        </p>
      </header>

      {/* Form */}
      <Suspense fallback={<CreateAdsSkeleton />}>
        <CreateAdsContent />
      </Suspense>
    </div>
  );
}