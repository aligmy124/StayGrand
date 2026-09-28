import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import RoomAdminDetails from "@/features/admin/rooms/components/RoomDetails";
import { viewRoomAdminService } from "@/features/admin/rooms/services/room.service";
import RoomAdminDetailsSkeleton from "@/Shared/Components/admin/RoomAdminDetailsSkeleton";

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

    const title = `Room ${room.roomNumber}`;
    const description = `Manage Room ${room.roomNumber}. Capacity: ${
      room.capacity
    } guests, Price: $${room.price}${
      room.discount > 0 ? `, Discount: ${room.discount}%` : ""
    }.`;

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
        images: room.images?.length ? [room.images[0]] : [],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: room.images?.length ? [room.images[0]] : [],
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
async function Room({ params }: Props) {
  const { id } = await params;

  try {
    const response = await viewRoomAdminService(id);
    const room = response?.data?.room;

    if (!room) {
      notFound();
    }

    return <RoomAdminDetails room={room} />;
  } catch (error) {
    console.error("Failed to fetch room:", error);
    notFound();
  }
}

/* ============ Page ============ */
export default function RoomDetails({ params }: Props) {
  return (
    <Suspense fallback={<RoomAdminDetailsSkeleton />}>
      <Room params={params} />
    </Suspense>
  );
}