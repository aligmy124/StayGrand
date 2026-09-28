import FacilityDetails from "@/features/admin/facilities/components/FacilityDetails";
import { viewFacilityAdminService } from "@/features/admin/facilities/services/facility.service";
import { Suspense } from "react";
interface Props {
  params: Promise<{ id: string }>;
}

function FacilitySkeleton() {
  return (
    <div className="space-y-4">
      <div className="h-40 animate-pulse rounded-3xl bg-[#F4F6F2]" />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-20 animate-pulse rounded-2xl bg-[#F4F6F2]" />
        ))}
      </div>
    </div>
  );
}

async function Facility({ params }: Props) {
  const { id } = await params;
  const facility = await viewFacilityAdminService(id);
  return <FacilityDetails facility={facility.data.facility} />;
}

export default function FacilityDetailsPage({ params }: Props) {
  return (
    <div className="mx-auto max-w-3xl p-6">
      <Suspense fallback={<FacilitySkeleton />}>
        <Facility params={params} />
      </Suspense>
    </div>
  );
}