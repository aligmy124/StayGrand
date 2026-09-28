export function AdsGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:gap-7 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="overflow-hidden rounded-2xl border border-[#E4E7E2] bg-white shadow-sm"
        >
          <div className="aspect-[16/10] w-full animate-pulse bg-[#F4F6F2]" />
          <div className="space-y-3 p-5">
            <div className="h-5 w-32 animate-pulse rounded bg-[#F4F6F2]" />
            <div className="h-3 w-48 animate-pulse rounded bg-[#F4F6F2]" />
            <div className="flex items-center justify-between border-t border-[#F4F6F2] pt-3">
              <div className="h-6 w-20 animate-pulse rounded bg-[#F4F6F2]" />
              <div className="h-4 w-16 animate-pulse rounded bg-[#F4F6F2]" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function AdDetailsSkeleton() {
  return (
    <div className="space-y-4">
      <div className="aspect-[16/8] min-h-[280px] w-full animate-pulse rounded-3xl bg-[#F4F6F2] sm:aspect-[21/8]" />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-20 animate-pulse rounded-2xl bg-[#F4F6F2]" />
        ))}
      </div>
      <div className="h-32 animate-pulse rounded-2xl bg-[#F4F6F2]" />
    </div>
  );
}