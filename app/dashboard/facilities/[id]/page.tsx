import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import FacilityDetails from "@/features/admin/facilities/components/FacilityDetails";
import { viewFacilityAdminService } from "@/features/admin/facilities/services/facility.service";
import FacilitySkeleton from "@/Shared/Components/admin/FacilitySkeleton";

/* ============ Types ============ */
interface Props {
  params: Promise<{ id: string }>;
}

/* ============ Metadata ============ */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { id } = await params;
    const response = await viewFacilityAdminService(id);
    const facility = response?.data?.facility;

    if (!facility) {
      return {
        title: "Facility Not Found",
        description: "The requested facility could not be found.",
        robots: { index: false, follow: false },
      };
    }

    const title = facility.name;
    const description = `Manage the "${facility.name}" facility. Created by ${
      facility.createdBy?.userName ?? "Unknown"
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
      },
      twitter: {
        card: "summary",
        title,
        description,
      },
    };
  } catch {
    return {
      title: "Facility Not Found",
      description: "The requested facility could not be found.",
      robots: { index: false, follow: false },
    };
  }
}

/* ============ Data ============ */
async function Facility({ params }: Props) {
  const { id } = await params;

  try {
    const response = await viewFacilityAdminService(id);
    const facility = response?.data?.facility;

    if (!facility) {
      notFound();
    }

    return <FacilityDetails facility={facility} />;
  } catch (error) {
    console.error("Failed to fetch facility:", error);
    notFound();
  }
}

/* ============ Page ============ */
export default function FacilityDetailsPage({ params }: Props) {
  return (
    <div className="mx-auto max-w-7xl p-6">
      <Suspense fallback={<FacilitySkeleton />}>
        <Facility params={params} />
      </Suspense>
    </div>
  );
}