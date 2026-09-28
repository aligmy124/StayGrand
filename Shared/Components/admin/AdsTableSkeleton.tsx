"use client";

export default function AdsTableSkeleton({
  rows = 6,
}: {
  rows?: number;
}) {
  return (
    <div className="animate-pulse space-y-4">
      {/* ================= SEARCH ================= */}
      <div className="relative">
        <div className="h-10 w-full rounded-xl border border-[#E4E7E2] bg-[#F0F2EE]" />
      </div>

      {/* ================= DESKTOP TABLE ================= */}
      <div className="hidden overflow-hidden rounded-2xl border border-[#E4E7E2] bg-white shadow-sm md:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px]">
            {/* Header */}
            <thead>
              <tr className="border-b border-[#E4E7E2] bg-[#FAFBF9]">
                {[
                  "Ads",
                  "Guest",
                  "Room",
                  "Dates",
                  "Total",
                  "Status",
                  "Actions",
                ].map((header) => (
                  <th
                    key={header}
                    className="px-4 py-3.5 text-left lg:px-5"
                  >
                    <div className="h-3 w-16 rounded bg-[#E3E7E1]" />
                  </th>
                ))}
              </tr>
            </thead>

            {/* Rows */}
            <tbody className="divide-y divide-[#F4F6F2]">
              {Array.from({ length: rows }).map((_, index) => (
                <AdsRowSkeleton key={index} />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= MOBILE CARDS ================= */}
      <div className="space-y-3 md:hidden">
        {Array.from({ length: Math.min(rows, 5) }).map((_, index) => (
          <AdsCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}

/* =========================================================
   Desktop Row Skeleton
========================================================= */

function AdsRowSkeleton() {
  return (
    <tr>
      {/* Ads */}
      <td className="px-4 py-4 lg:px-5">
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 shrink-0 rounded-xl bg-[#E8EBE6]" />

          <div className="space-y-2">
            <div className="h-3.5 w-20 rounded bg-[#E3E7E1]" />
            <div className="h-2.5 w-14 rounded bg-[#ECEFEA]" />
          </div>
        </div>
      </td>

      {/* Guest */}
      <td className="px-4 py-4 lg:px-5">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 shrink-0 rounded-full bg-[#E3E7E1]" />
          <div className="h-3 w-20 rounded bg-[#E8EBE6]" />
        </div>
      </td>

      {/* Room */}
      <td className="px-4 py-4 lg:px-5">
        <div className="h-7 w-20 rounded-lg bg-[#F0F2EE]" />
      </td>

      {/* Dates */}
      <td className="px-4 py-4 lg:px-5">
        <div className="space-y-2">
          <div className="h-3 w-24 rounded bg-[#E3E7E1]" />
          <div className="h-3 w-28 rounded bg-[#ECEFEA]" />
        </div>
      </td>

      {/* Total */}
      <td className="px-4 py-4 lg:px-5">
        <div className="h-4 w-16 rounded bg-[#DDE3DA]" />
      </td>

      {/* Status */}
      <td className="px-4 py-4 lg:px-5">
        <div className="h-6 w-20 rounded-full bg-[#E8EBE6]" />
      </td>

      {/* Actions */}
      <td className="px-4 py-4 lg:px-5">
        <div className="flex items-center justify-end gap-1">
          <div className="h-8 w-8 rounded-lg bg-[#F0F2EE]" />
          <div className="h-8 w-8 rounded-lg bg-[#F0F2EE]" />
        </div>
      </td>
    </tr>
  );
}

/* =========================================================
   Mobile Card Skeleton
========================================================= */

function AdsCardSkeleton() {
  return (
    <article className="rounded-2xl border border-[#E4E7E2] bg-white p-4 shadow-sm">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 shrink-0 rounded-xl bg-[#E8EBE6]" />

          <div className="space-y-2">
            <div className="h-3.5 w-20 rounded bg-[#E3E7E1]" />
            <div className="h-3 w-14 rounded bg-[#ECEFEA]" />
          </div>
        </div>

        {/* Status */}
        <div className="h-5 w-20 rounded-full bg-[#E8EBE6]" />
      </div>

      {/* Details */}
      <div className="mt-4 space-y-3">
        {/* Guest */}
        <div className="flex items-center gap-2">
          <div className="h-3.5 w-3.5 rounded bg-[#E3E7E1]" />
          <div className="h-3 w-24 rounded bg-[#E8EBE6]" />
        </div>

        {/* Room */}
        <div className="flex items-center gap-2">
          <div className="h-3.5 w-3.5 rounded bg-[#E3E7E1]" />
          <div className="h-3 w-20 rounded bg-[#E8EBE6]" />
        </div>

        {/* Dates */}
        <div className="flex items-center gap-2">
          <div className="h-3.5 w-3.5 rounded bg-[#E3E7E1]" />
          <div className="h-3 w-40 rounded bg-[#E8EBE6]" />
        </div>

        {/* Total + Actions */}
        <div className="flex items-center justify-between border-t border-[#F4F6F2] pt-3">
          <div className="h-4 w-20 rounded bg-[#DDE3DA]" />

          <div className="flex items-center gap-1">
            <div className="h-8 w-8 rounded-lg bg-[#F0F2EE]" />
            <div className="h-8 w-8 rounded-lg bg-[#F0F2EE]" />
          </div>
        </div>
      </div>
    </article>
  );
}
