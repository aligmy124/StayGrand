import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { singleRoom } from "@/features/portal/rooms/services/roome.service";
import RoomDetails from "@/features/portal/rooms/Components/RoomDetails";
import Container from "@/Shared/Components/Container";
import { SingleRoomSkeleton } from "@/Shared/Components/SkeletonRoom";

/* ============ Types ============ */
interface Props {
  params: Promise<{
    id: string;
  }>;
}

/* ============ Metadata ============ */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { id } = await params;
    const response = await singleRoom(id);
    const room = response?.data?.room;

    if (!room) {
      return {
        title: "Room Not Found",
        description: "The requested room could not be found.",
        robots: { index: false, follow: false },
      };
    }

    const title = `Room ${room.roomNumber}`;
    const description = `Book Room ${room.roomNumber} with ${
      room.capacity
    } guests. ${
      room.discount > 0 ? `${room.discount}% OFF! ` : ""
    }Available now.`;

    const images = room.images?.length ? [room.images[0]] : [];

    return {
      title,
      description,
      alternates: {
        canonical: `/rooms/${id}`,
      },
      openGraph: {
        title,
        description,
        type: "website",
        images,
        url: `/rooms/${id}`,
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
      title: "Room Not Found",
      description: "The requested room could not be found.",
      robots: { index: false, follow: false },
    };
  }
}

/* ============ Data ============ */
async function RoomData({ params }: Props) {
  const { id } = await params;
  try {
    const response = await singleRoom(id);
    const room = response?.data?.room;

    if (!room) {
      notFound();
    }

    return <RoomDetails room={room} />;
  } catch (error) {
    console.error("Failed to fetch room:", error);
    notFound();
  }
}

/* ============ Page ============ */
export default async function RoomPage({ params }: Props) {
  return (
    <Container className="px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-10">
      <Suspense fallback={<SingleRoomSkeleton />}>
        <RoomData params={params} />
      </Suspense>
    </Container>
  );
}
