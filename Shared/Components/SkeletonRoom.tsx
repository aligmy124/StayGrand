import React from "react";

export function SkeletonRoom() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="rounded-2xl bg-gray-200">
            <div className="aspect-[4/3] rounded-t-2xl bg-gray-300" />
            <div className="p-4 space-y-3">
              <div className="h-6 bg-gray-300 rounded w-3/4" />
              <div className="h-4 bg-gray-300 rounded w-1/2" />
              <div className="flex justify-between">
                <div className="h-6 bg-gray-300 rounded w-1/4" />
                <div className="h-6 bg-gray-300 rounded w-1/4" />
              </div>
              <div className="h-10 bg-gray-300 rounded-xl w-full" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
// Skeleton Loading Component
export function SingleRoomSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f5f7f3] to-white">
      <div className="container mx-auto px-4 py-6 md:px-6 md:py-10 lg:px-8 lg:py-12">
        {/* Back Button Skeleton */}
        <div className="mb-6 h-10 w-32 animate-pulse rounded-full bg-gray-200" />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
          {/* Images Skeleton */}
          <div className="lg:col-span-3">
            <div className="aspect-[4/3] animate-pulse rounded-2xl bg-gray-200" />
            <div className="mt-4 grid grid-cols-5 gap-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="aspect-[4/3] animate-pulse rounded-xl bg-gray-200" />
              ))}
            </div>
            <div className="mt-6 flex items-center gap-6 rounded-2xl bg-white/80 p-4">
              <div className="h-6 w-32 animate-pulse rounded bg-gray-200" />
              <div className="h-6 w-px bg-gray-200" />
              <div className="h-6 w-24 animate-pulse rounded bg-gray-200" />
            </div>
          </div>

          {/* Details Skeleton */}
          <div className="lg:col-span-2">
            <div className="sticky top-8 space-y-6">
              <div className="rounded-2xl bg-white p-6 shadow-lg">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="h-8 w-40 animate-pulse rounded bg-gray-200" />
                    <div className="mt-2 h-5 w-32 animate-pulse rounded bg-gray-200" />
                  </div>
                  <div className="text-right">
                    <div className="h-8 w-24 animate-pulse rounded bg-gray-200" />
                    <div className="mt-1 h-4 w-16 animate-pulse rounded bg-gray-200" />
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-white p-6 shadow-lg">
                <div className="h-5 w-24 animate-pulse rounded bg-gray-200" />
                <div className="mt-4 flex flex-wrap gap-2">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-10 w-20 animate-pulse rounded-full bg-gray-200" />
                  ))}
                </div>
              </div>

              <div className="rounded-2xl bg-white p-6 shadow-lg">
                <div className="space-y-3">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex items-center justify-between border-b border-[#4E604F]/10 pb-3">
                      <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />
                      <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
                    </div>
                  ))}
                </div>
                <div className="mt-4 h-12 w-full animate-pulse rounded-xl bg-gray-200" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}