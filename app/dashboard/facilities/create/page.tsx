import { CreateFacilityForm } from "@/features/admin/facilities/components/CreateFacilityForm";

export default function CreateFacilityPage() {
  return (
    <div className="mx-auto max-w-7xl p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#1B1C1C]">Create Facility</h1>
        <p className="mt-1 text-sm text-[#8A9189]">
          Add a new facility that can be assigned to rooms.
        </p>
      </div>

      <CreateFacilityForm />
    </div>
  );
}