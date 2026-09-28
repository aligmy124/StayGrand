import type { Metadata } from "next";
import { Suspense } from "react";
import { CreateRoomForm } from "@/features/admin/rooms/components/CreateRoomForm";
import { getFacilitiesService } from "@/features/admin/rooms/services/room.service";
import CreateRoomSkeleton from "@/Shared/Components/admin/CreateRoomSkeleton";

/* ============ Metadata ============ */
export const metadata: Metadata = {
  title: "Create Room",
  description:
    "Add a new room with details like number, price, capacity, facilities, and images.",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Create Room",
    description:
      "Add a new room with details like number, price, capacity, facilities, and images.",
    type: "website",
  },
};


/* ============ Data ============ */
async function CreateRoomContent() {
  const facilitiesResponse = await getFacilitiesService();
  const allFacilities = facilitiesResponse.data.facilities;

  return <CreateRoomForm allFacilities={allFacilities} />;
}

/* ============ Page ============ */
export default function CreateRoomPage() {
  return (
    <div className="mx-auto max-w-7xl p-6">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-[#1B1C1C] sm:text-3xl">
          Create Room
        </h1>
        <p className="mt-1 text-sm text-[#8A9189]">
          Fill in the details below to add a new room.
        </p>
      </header>

      <Suspense fallback={<CreateRoomSkeleton />}>
        <CreateRoomContent />
      </Suspense>
    </div>
  );
}