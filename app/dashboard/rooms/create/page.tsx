import { CreateRoomForm } from "@/features/admin/rooms/components/CreateRoomForm";
import { getFacilitiesService } from "@/features/admin/rooms/services/room.service";

export default async function CreateRoomPage() {
  const facilitiesResponse = await getFacilitiesService();
  const allFacilities = facilitiesResponse.data.facilities;

  return (
    <div className="mx-auto max-w-7xl p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#1B1C1C]">Create Room</h1>
        <p className="mt-1 text-sm text-[#8A9189]">
          Fill in the details below to add a new room.
        </p>
      </div>

      <CreateRoomForm allFacilities={allFacilities} />
    </div>
  );
}
