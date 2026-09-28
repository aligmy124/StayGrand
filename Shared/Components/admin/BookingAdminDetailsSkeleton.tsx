"use client";

export default function BookingAdminDetailsSkeleton() {
  return (
    <article className="animate-pulse overflow-hidden rounded-3xl border border-[#E4E7E2] bg-white shadow-[0_8px_30px_rgba(27,28,28,0.05)]">
      {/* ================= HERO ================= */}
      <div className="border-b border-[#F0F2EE] bg-gradient-to-br from-[#F8F9F7] via-white to-[#F0F3EE] p-6 sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          {/* Booking identity */}
          <div className="min-w-0">
            <div className="mb-2 h-3 w-16 rounded bg-[#E3E7E1]" />

            <div className="h-10 w-40 rounded-lg bg-[#E3E7E1] sm:h-11 sm:w-48" />

            <div className="mt-2 h-3 w-32 rounded bg-[#ECEFEA]" />
          </div>

          {/* Status */}
          <div className="h-7 w-24 rounded-full bg-[#E8EBE6]" />
        </div>
      </div>

      {/* ================= META ================= */}
      <div className="grid grid-cols-1 gap-3 p-4 sm:grid-cols-2 sm:p-5">
        <MetaCardSkeleton />
        <MetaCardSkeleton />
        <MetaCardSkeleton />
        <MetaCardSkeleton />
      </div>

      {/* ================= PRICING ================= */}
      <div className="border-t border-[#F0F2EE] px-5 py-5 sm:px-6">
        {/* Section header */}
        <div className="mb-4 flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-[#E8EBE6]" />

          <div>
            <div className="h-4 w-28 rounded bg-[#E3E7E1]" />
            <div className="mt-1.5 h-3 w-32 rounded bg-[#ECEFEA]" />
          </div>
        </div>

        {/* Pricing box */}
        <div className="space-y-3 rounded-2xl border border-[#F0F2EE] bg-[#FAFBF9] p-4">
          <PriceRowSkeleton width="w-14" valueWidth="w-16" />

          <PriceRowSkeleton width="w-28" valueWidth="w-20" />

          <div className="mt-2 flex items-center justify-between border-t border-[#E4E7E2] pt-3">
            <div className="h-4 w-12 rounded bg-[#E3E7E1]" />
            <div className="h-6 w-24 rounded bg-[#DDE3DA]" />
          </div>
        </div>
      </div>

      {/* ================= PAYMENT ================= */}
      <div className="border-t border-[#F0F2EE] px-5 py-5 sm:px-6">
        {/* Section header */}
        <div className="mb-3 flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-[#E8EBE6]" />

          <div>
            <div className="h-4 w-16 rounded bg-[#E3E7E1]" />
            <div className="mt-1.5 h-3 w-48 rounded bg-[#ECEFEA]" />
          </div>
        </div>

        {/* Stripe charge ID */}
        <div className="flex items-center gap-2 rounded-xl border border-[#F0F2EE] bg-[#FAFBF9] px-3 py-2.5">
          <div className="h-4 w-4 shrink-0 rounded bg-[#E3E7E1]" />
          <div className="h-3 w-48 rounded bg-[#E8EBE6]" />
        </div>
      </div>

      {/* ================= FOOTER ================= */}
      <footer className="flex flex-col gap-3 border-t border-[#F0F2EE] bg-[#FAFBF9] px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        {/* Guest */}
        <div className="flex min-w-0 items-center gap-3">
          <div className="h-9 w-9 shrink-0 rounded-full bg-[#E3E7E1]" />

          <div className="min-w-0">
            <div className="h-4 w-24 rounded bg-[#E3E7E1]" />
            <div className="mt-1.5 h-3 w-12 rounded bg-[#ECEFEA]" />
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
    <div className="flex items-center gap-3 rounded-2xl border border-[#E8EBE6] bg-[#FAFBF9] p-3.5">
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
   Pricing Row Skeleton
========================================================= */

function PriceRowSkeleton({
  width,
  valueWidth,
}: {
  width: string;
  valueWidth: string;
}) {
  return (
    <div className="flex items-center justify-between text-sm">
      <div className={`h-3.5 ${width} rounded bg-[#E3E7E1]`} />
      <div className={`h-4 ${valueWidth} rounded bg-[#E8EBE6]`} />
    </div>
  );
}
