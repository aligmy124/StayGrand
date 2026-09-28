"use client";

export default function RoomAdminDetailsSkeleton() {
  return (
    <article className="animate-pulse overflow-hidden rounded-3xl border border-[#E4E7E2] bg-white shadow-[0_8px_30px_rgba(27,28,28,0.05)]">
      {/* ================= IMAGE ================= */}
      <div className="relative aspect-[16/8] min-h-[280px] w-full overflow-hidden bg-[#E8EBE6] sm:aspect-[21/8]">
        {/* Image */}
        <div className="absolute inset-0 bg-[#E3E7E1]" />

        {/* Discount */}
        <div className="absolute left-4 top-4 h-7 w-20 rounded-full bg-white/60" />

        {/* Image content */}
        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            {/* Room identity */}
            <div className="min-w-0">
              <div className="mb-2 h-3 w-12 rounded bg-white/40" />

              <div className="h-10 w-28 rounded-lg bg-white/50 sm:h-11 sm:w-32" />

              <div className="mt-2 h-3 w-24 rounded bg-white/30" />
            </div>

            {/* Price */}
            <div className="shrink-0">
              <div className="flex items-baseline gap-2">
                <div className="h-10 w-28 rounded-lg bg-white/50 sm:h-11 sm:w-32" />

                <div className="h-4 w-16 rounded bg-white/30" />
              </div>

              <div className="ml-auto mt-2 h-3 w-20 rounded bg-white/30" />
            </div>
          </div>
        </div>
      </div>

      {/* ================= META ================= */}
      <div className="grid grid-cols-1 gap-3 p-4 sm:grid-cols-3 sm:p-5">
        <MetaCardSkeleton />
        <MetaCardSkeleton />
        <MetaCardSkeleton />
      </div>

      {/* ================= FACILITIES ================= */}
      <div className="border-t border-[#F0F2EE] px-5 py-5 sm:px-6">
        <div className="mb-4 flex items-center justify-between">
          {/* Title */}
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-[#E8EBE6]" />

            <div>
              <div className="h-4 w-20 rounded bg-[#E3E7E1]" />

              <div className="mt-1.5 h-3 w-28 rounded bg-[#ECEFEA]" />
            </div>
          </div>

          {/* Count */}
          <div className="h-6 w-8 rounded-full bg-[#E8EBE6]" />
        </div>

        {/* Facility chips */}
        <div className="flex flex-wrap gap-2">
          <FacilitySkeleton width="w-20" />
          <FacilitySkeleton width="w-24" />
          <FacilitySkeleton width="w-16" />
          <FacilitySkeleton width="w-28" />
          <FacilitySkeleton width="w-20" />
        </div>
      </div>

      {/* ================= FOOTER ================= */}
      <footer className="flex flex-col gap-3 border-t border-[#F0F2EE] bg-[#FAFBF9] px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        {/* Creator */}
        <div className="flex min-w-0 items-center gap-3">
          <div className="h-9 w-9 shrink-0 rounded-full bg-[#E3E7E1]" />

          <div className="min-w-0">
            <div className="h-4 w-24 rounded bg-[#E3E7E1]" />

            <div className="mt-1.5 h-3 w-36 rounded bg-[#ECEFEA]" />
          </div>
        </div>

        {/* Updated */}
        <div className="flex items-center gap-1.5">
          <div className="h-3.5 w-3.5 rounded-full bg-[#E3E7E1]" />

          <div className="h-3 w-28 rounded bg-[#ECEFEA]" />
        </div>
      </footer>
    </article>
  );
}

/* =========================================================
   Meta Card Skeleton
========================================================= */

function MetaCardSkeleton() {
  return (
    <div
      className="
        flex items-center gap-3
        rounded-2xl border border-[#E8EBE6]
        bg-[#FAFBF9] p-3.5
      "
    >
      {/* Icon */}
      <div className="h-10 w-10 shrink-0 rounded-xl bg-[#E3E7E1]" />

      {/* Text */}
      <div className="min-w-0">
        <div className="h-2.5 w-16 rounded bg-[#E3E7E1]" />

        <div className="mt-2 h-4 w-24 rounded bg-[#E8EBE6]" />
      </div>
    </div>
  );
}

/* =========================================================
   Facility Skeleton
========================================================= */

function FacilitySkeleton({
  width,
}: {
  width: string;
}) {
  return (
    <div
      className={`h-8 ${width} rounded-lg border border-[#E8EBE6] bg-[#F0F2EE]`}
    />
  );
}

