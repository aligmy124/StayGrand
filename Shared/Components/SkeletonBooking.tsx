export function BookingsLoading() {
  return (
    <div className="space-y-4">

      {/* Stats Skeleton */}
      <div className="mb-6 h-24 animate-pulse rounded-2xl bg-white shadow-sm" />

      {/* Booking Skeletons */}
      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className="animate-pulse rounded-2xl border border-[#E5E8E2] bg-white p-5"
        >
          <div className="flex flex-col gap-5 sm:flex-row sm:justify-between">

            <div className="flex-1">
              {/* Title */}
              <div className="h-5 w-32 rounded bg-[#E8EBE6]" />

              {/* Status */}
              <div className="mt-3 h-6 w-20 rounded-full bg-[#F1F3EF]" />

              {/* Dates */}
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div>
                  <div className="h-3 w-16 rounded bg-[#E8EBE6]" />
                  <div className="mt-2 h-4 w-28 rounded bg-[#E8EBE6]" />
                </div>

                <div>
                  <div className="h-3 w-16 rounded bg-[#E8EBE6]" />
                  <div className="mt-2 h-4 w-28 rounded bg-[#E8EBE6]" />
                </div>
              </div>

              {/* Created date */}
              <div className="mt-4 h-4 w-40 rounded bg-[#E8EBE6]" />
            </div>

            {/* Price */}
            <div className="flex flex-col items-end gap-3">
              <div className="h-3 w-20 rounded bg-[#E8EBe6]" />
              <div className="h-7 w-24 rounded bg-[#E8EBe6]" />

              <div className="flex gap-2">
                <div className="h-8 w-24 rounded-lg bg-[#E8EBe6]" />
                <div className="h-8 w-20 rounded-lg bg-[#E8EBe6]" />
              </div>
            </div>

          </div>
        </div>
      ))}
    </div>
  );
}