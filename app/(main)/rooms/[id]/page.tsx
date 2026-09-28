import { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { singleRoom } from "@/features/rooms/services/roome.service";
import RoomDetails from "@/features/rooms/Components/RoomDetails";
import Container from "@/Shared/Components/Container";
import { SingleRoomSkeleton } from "@/Shared/Components/SkeletonRoom";
import ExploreRoomsHeaders from "@/features/rooms/Components/ExploreRoomsHeaders";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { id } = await params;
    const response = await singleRoom(id);
    const room = response?.data?.room;

    if (!room) {
      return {
        title: "Room Not Found | StayCation",
        description: "The requested room could not be found.",
      };
    }

    const title = `Room ${room.roomNumber} | StayCation`;
    const description = `Book Room ${room.roomNumber} with ${room.capacity} guests. ${room.discount > 0 ? `${room.discount}% OFF! ` : ""}Available now at StayCation.`;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
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
      title: "Room Not Found | StayCation",
      description: "The requested room could not be found.",
    };
  }
}

// Room data fetching component
async function RoomData({ params }: Props) {
  const {id} = await params;
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

// Main page component
export default async function RoomPage({ params }: Props) {
  return (
    <Container className="py-4 sm:py-6 md:py-8 lg:py-10 px-4 sm:px-6 lg:px-8">
      {/* <ExploreRoomsHeaders /> */}
      <Suspense fallback={<SingleRoomSkeleton />}>
        <RoomData params={params} />
      </Suspense>
    </Container>
  );
}
