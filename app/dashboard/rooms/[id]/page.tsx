import RoomAdminDetails from "@/features/admin/rooms/components/RoomDetails";
import { viewRoomAdminService } from "@/features/admin/rooms/services/room.service";
import RoomAdminDetailsSkeleton from "@/Shared/Components/admin/RoomAdminDetailsSkeleton";
import { Suspense } from "react";

interface Props {
  params: Promise<{ id: string }>;
}
async function Room({ params }: Props) {
  const { id } = await params;

  const room = await viewRoomAdminService(id);

  return <RoomAdminDetails room={room.data.room} />;
}
export default function RoomDetails({ params }: Props) {
  return (
    <Suspense fallback={<RoomAdminDetailsSkeleton />}>
      <Room params={params} />
    </Suspense>
  );
}
