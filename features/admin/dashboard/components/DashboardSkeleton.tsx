export default function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      {/* ================= HEADER ================= */}
      <div className="space-y-2">
        <div className="h-8 w-44 animate-pulse rounded-lg bg-[#E8EBE6]" />
        <div className="h-4 w-72 animate-pulse rounded bg-[#F0F2EE]" />
      </div>

      {/* ================= STATS ================= */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <StatSkeleton key={index} />
        ))}
      </div>

      {/* ================= CHARTS ================= */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {Array.from({ length: 2 }).map((_, index) => (
          <CircleChartSkeleton key={index} />
        ))}
      </div>

      {/* ================= BOTTOM SECTION ================= */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Recent bookings */}
        <div className="overflow-hidden rounded-2xl border border-[#E4E7E2] bg-white lg:col-span-2">
          <div className="border-b border-[#F0F2EE] px-5 py-4">
            <div className="h-5 w-32 animate-pulse rounded bg-[#E8EBE6]" />
            <div className="mt-2 h-3 w-48 animate-pulse rounded bg-[#F0F2EE]" />
          </div>

          <div className="divide-y divide-[#F4F6F2]">
            {Array.from({ length: 5 }).map((_, index) => (
              <RecentBookingSkeleton key={index} />
            ))}
          </div>
        </div>

        {/* Quick summary */}
        <div className="rounded-2xl border border-[#E4E7E2] bg-white p-5">
          <div className="h-5 w-28 animate-pulse rounded bg-[#E8EBE6]" />

          <div className="mt-5 space-y-5">
            {Array.from({ length: 4 }).map((_, index) => (
              <SummaryRowSkeleton key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   STAT
========================================================= */

function StatSkeleton() {
  return (
    <div className="rounded-2xl border border-[#E4E7E2] bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        {/* Icon */}
        <div className="h-10 w-10 animate-pulse rounded-xl bg-[#F0F3EE]" />

        {/* Small trend */}
        <div className="h-5 w-14 animate-pulse rounded-full bg-[#F4F6F2]" />
      </div>

      {/* Label */}
      <div className="mt-5 h-3 w-24 animate-pulse rounded bg-[#ECEFEA]" />

      {/* Number */}
      <div className="mt-2 h-7 w-20 animate-pulse rounded-lg bg-[#E3E7E1]" />
    </div>
  );
}

/* =========================================================
   CHART
========================================================= */

function ChartSkeleton() {
  return (
    <div className="rounded-2xl border border-[#E4E7E2] bg-white p-5 shadow-sm">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="h-5 w-32 animate-pulse rounded bg-[#E8EBE6]" />
          <div className="mt-2 h-3 w-44 animate-pulse rounded bg-[#F0F2EE]" />
        </div>

        <div className="h-8 w-20 animate-pulse rounded-lg bg-[#F4F6F2]" />
      </div>

      {/* Fake chart */}
      <div className="relative mt-6 h-64">
        {/* Y-axis */}
        <div className="absolute bottom-0 left-0 top-0 flex w-8 flex-col justify-between">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="h-2 w-6 animate-pulse rounded bg-[#F0F2EE]"
            />
          ))}
        </div>

        {/* Chart area */}
        <div className="absolute bottom-0 left-10 right-0 top-0">
          {/* Grid lines */}
          <div className="absolute inset-x-0 top-0 border-t border-[#F0F2EE]" />
          <div className="absolute inset-x-0 top-1/4 border-t border-[#F0F2EE]" />
          <div className="absolute inset-x-0 top-1/2 border-t border-[#F0F2EE]" />
          <div className="absolute inset-x-0 top-3/4 border-t border-[#F0F2EE]" />
          <div className="absolute inset-x-0 bottom-0 border-t border-[#F0F2EE]" />

          {/* Fake bars */}
          <div className="absolute inset-x-4 bottom-0 flex h-full items-end justify-between gap-3">
            {["h-20", "h-32", "h-24", "h-44", "h-36", "h-52", "h-40"].map(
              (height, index) => (
                <div
                  key={index}
                  className={`w-full max-w-10 animate-pulse rounded-t-md bg-[#E8EBE6] ${height}`}
                />
              ),
            )}
          </div>
        </div>
      </div>

      {/* X-axis */}
      <div className="ml-10 mt-3 flex justify-between">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="h-2 w-10 animate-pulse rounded bg-[#F0F2EE]"
          />
        ))}
      </div>
    </div>
  );
}

/* =========================================================
   RECENT BOOKING
========================================================= */

function RecentBookingSkeleton() {
  return (
    <div className="flex items-center gap-3 px-5 py-4">
      {/* Avatar */}
      <div className="h-10 w-10 shrink-0 animate-pulse rounded-xl bg-[#F0F3EE]" />

      {/* Info */}
      <div className="min-w-0 flex-1">
        <div className="h-3.5 w-28 animate-pulse rounded bg-[#E8EBE6]" />
        <div className="mt-2 h-2.5 w-36 animate-pulse rounded bg-[#F0F2EE]" />
      </div>

      {/* Status */}
      <div className="h-6 w-20 animate-pulse rounded-full bg-[#F0F2EE]" />

      {/* Price */}
      <div className="h-4 w-16 animate-pulse rounded bg-[#E8EBE6]" />
    </div>
  );
}

/* =========================================================
   SUMMARY
========================================================= */

function SummaryRowSkeleton() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="h-3 w-24 animate-pulse rounded bg-[#ECEFEA]" />
        <div className="h-3.5 w-12 animate-pulse rounded bg-[#E3E7E1]" />
      </div>

      <div className="mt-2 h-2 animate-pulse overflow-hidden rounded-full bg-[#F0F2EE]">
        <div className="h-full w-2/3 rounded-full bg-[#E3E7E1]" />
      </div>
    </div>
  );
}
function CircleChartSkeleton() {
  return (
    <div className="rounded-2xl border border-[#E4E7E2] bg-white p-5 shadow-sm">
      {/* Header */}
      <div>
        <div className="h-5 w-32 animate-pulse rounded bg-[#E8EBE6]" />

        <div className="mt-2 h-3 w-44 animate-pulse rounded bg-[#F0F2EE]" />
      </div>

      {/* Donut */}
      <div className="flex items-center justify-center py-8">
        <div className="relative h-52 w-52 animate-pulse rounded-full bg-[#E8EBE6]">
          {/* Inner circle */}
          <div className="absolute inset-10 rounded-full bg-white" />

          {/* Center text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="h-7 w-16 rounded bg-[#E3E7E1]" />
            <div className="mt-2 h-3 w-20 rounded bg-[#F0F2EE]" />
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-3 border-t border-[#F0F2EE] pt-4">
        <LegendSkeleton />
        <LegendSkeleton />
        <LegendSkeleton />
        <LegendSkeleton />
      </div>
    </div>
  );
}

function LegendSkeleton() {
  return (
    <div className="flex items-center gap-2">
      <div className="h-2.5 w-2.5 animate-pulse rounded-full bg-[#DDE3DA]" />

      <div className="h-3 w-20 animate-pulse rounded bg-[#ECEFEA]" />

      <div className="ml-auto h-3 w-8 animate-pulse rounded bg-[#E3E7E1]" />
    </div>
  );
}
