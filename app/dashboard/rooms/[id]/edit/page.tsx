import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";

import {
  viewRoomAdminService,
  getFacilitiesService,
} from "@/features/admin/rooms/services/room.service";
import { EditRoomForm } from "@/features/admin/rooms/components/EditRoomForm";
import EditRoomSkeleton from "@/Shared/Components/admin/EditRoomSkeleton";

/* ============ Types ============ */
interface Props {
  params: Promise<{ id: string }>;
}

/* ============ Metadata ============ */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { id } = await params;
    const response = await viewRoomAdminService(id);
    const room = response?.data?.room;

    if (!room) {
      return {
        title: "Room Not Found",
        description: "The requested room could not be found.",
        robots: { index: false, follow: false },
      };
    }

    return {
      title: `Edit Room ${room.roomNumber}`,
      description: `Edit details for Room ${room.roomNumber}. Update price, capacity, facilities, and images.`,
      robots: {
        index: false,
        follow: false,
      },
      openGraph: {
        title: `Edit Room ${room.roomNumber}`,
        description: `Edit details for Room ${room.roomNumber}.`,
        type: "website",
      },
    };
  } catch {
    return {
      title: "Room Not Found",
      description: "The requested room could not be found.",
      robots: { index: false, follow: false },
    };
  }
}

/* ============ Data ============ */
async function EditRoomContent({ params }: Props) {
  const { id } = await params;

  try {
    const [roomResponse, facilitiesResponse] = await Promise.all([
      viewRoomAdminService(id),
      getFacilitiesService(),
    ]);

    const room = roomResponse?.data?.room;
    const allFacilities = facilitiesResponse?.data?.facilities ?? [];

    if (!room) {
      notFound();
    }

    return <EditRoomForm room={room} allFacilities={allFacilities} />;
  } catch (error) {
    console.error("Failed to fetch room:", error);
    notFound();
  }
}

/* ============ Page ============ */
export default function EditRoomPage({ params }: Props) {
  return (
    <div className="mx-auto max-w-7xl p-6">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-[#1B1C1C] sm:text-3xl">
          Edit Room
        </h1>
        <p className="mt-1 text-sm text-[#8A9189]">
          Update the room details and save your changes.
        </p>
      </header>

      <Suspense fallback={<EditRoomSkeleton/>}>
        <EditRoomContent params={params} />
      </Suspense>
    </div>
  );
}