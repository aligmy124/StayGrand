import type { Metadata } from "next";
import { CreateFacilityForm } from "@/features/admin/facilities/components/CreateFacilityForm";

/* ============ Metadata ============ */
export const metadata: Metadata = {
  title: "Create Facility",
  description:
    "Add a new facility that can be assigned to rooms. Give it a clear, unique name.",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Create Facility",
    description:
      "Add a new facility that can be assigned to rooms. Give it a clear, unique name.",
    type: "website",
  },
};

/* ============ Page ============ */
export default function CreateFacilityPage() {
  return (
    <div className="mx-auto max-w-7xl p-6">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-[#1B1C1C] sm:text-3xl">
          Create Facility
        </h1>
        <p className="mt-1 text-sm text-[#8A9189]">
          Add a new facility that can be assigned to rooms.
        </p>
      </header>

      <CreateFacilityForm />
    </div>
  );
}