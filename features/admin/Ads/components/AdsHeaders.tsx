import React from "react";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function AdsHeaders() {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[#1B1C1C]">
          Ads
        </h1>

        <p className="mt-1 text-sm text-[#434842]/60">
          Manage your room advertisements and their visibility.
        </p>
      </div>

      <Link
        href={"/dashboard/ads/create"}
        className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#4E604F] px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-[#3f4f40] hover:shadow-md"
      >
        <Plus className="h-4 w-4" />
        Add Ad
      </Link>
    </div>
  );
}