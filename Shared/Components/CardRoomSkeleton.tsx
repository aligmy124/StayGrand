import React from "react";

interface CardRoomSkeletonProps {
  count?: number;
}

export default function CardRoomSkeleton({
  count = 6,
}: CardRoomSkeletonProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <article
          key={index}
          className="relative h-full overflow-hidden rounded-[26px] border border-[#4E604F]/10 bg-white shadow-[0_10px_35px_-15px_rgba(27,28,28,0.15)]"
        >
          {/* Image */}
          <div className="relative aspect-[4/3] animate-pulse bg-[#eef1eb]">
            {/* Discount placeholder */}
            <div className="absolute left-4 top-4 h-7 w-20 rounded-full bg-black/10" />

            {/* Share placeholder */}
            <div className="absolute right-4 top-4 h-10 w-10 rounded-full bg-black/10" />

            {/* Room number */}
            <div className="absolute bottom-4 left-5 space-y-2">
              <div className="h-2 w-16 rounded bg-white/30" />
              <div className="h-5 w-24 rounded bg-white/40" />
            </div>
          </div>

          {/* Content */}
          <div className="p-5 sm:p-6">
            {/* Header */}
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1 space-y-3">
                <div className="h-5 w-28 animate-pulse rounded bg-[#eef1eb]" />

                <div className="h-4 w-20 animate-pulse rounded bg-[#eef1eb]" />
              </div>

              {/* Price */}
              <div className="shrink-0 space-y-2 text-right">
                <div className="ml-auto h-3 w-14 animate-pulse rounded bg-[#eef1eb]" />
                <div className="ml-auto h-6 w-20 animate-pulse rounded bg-[#eef1eb]" />
                <div className="ml-auto h-2.5 w-14 animate-pulse rounded bg-[#eef1eb]" />
              </div>
            </div>

            {/* Divider */}
            <div className="my-4 h-px bg-[#4E604F]/[0.07]" />

            {/* Facilities */}
            <div className="flex min-h-[28px] gap-1.5">
              <div className="h-7 w-20 animate-pulse rounded-full bg-[#eef1eb]" />
              <div className="h-7 w-24 animate-pulse rounded-full bg-[#eef1eb]" />
              <div className="h-7 w-16 animate-pulse rounded-full bg-[#eef1eb]" />
            </div>

            {/* Footer */}
            <div className="mt-5 flex items-center justify-between">
              <div className="flex gap-3">
                <div className="h-4 w-14 animate-pulse rounded bg-[#eef1eb]" />
                <div className="h-4 w-14 animate-pulse rounded bg-[#eef1eb]" />
              </div>

              <div className="h-4 w-12 animate-pulse rounded bg-[#eef1eb]" />
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

