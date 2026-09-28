import { Suspense } from "react";
import CardRoom from "@/features/rooms/Components/explore/CardRoom";
import { getRooms } from "@/features/rooms/services/roome.service";
import FeaturedHotelsClient from "./FeaturedHotelsClient";
import { SkeletonRoom } from "@/Shared/Components/SkeletonRoom";

// Server Component - لجلب البيانات
async function FetchHotels() {
  const rooms = await getRooms({
    size: 6,
  });
  return <CardRoom rooms={rooms.data.rooms} />;
}

export default function FeaturedHotels() {
  return (
    <div className="w-full px-4 py-8 md:px-6 md:py-12 lg:px-8 lg:py-16">
      {/* Header - Client Component للتفاعل */}
      <FeaturedHotelsClient />

      {/* Hotel Grid with Suspense */}
      <Suspense fallback={<SkeletonRoom />}>
        <FetchHotels />
      </Suspense>
    </div>
  );
}
