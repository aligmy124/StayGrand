export default function ProfileSkeleton() {
  return (
    <main className="min-h-screen bg-[#F7F8F5] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Page Header */}
        <header className="mb-8">
          <div className="h-4 w-20 animate-pulse rounded bg-[#F4F6F2]" />
          <div className="mt-3 h-9 w-48 animate-pulse rounded-lg bg-[#F4F6F2]" />
          <div className="mt-3 h-4 w-80 animate-pulse rounded bg-[#F4F6F2]" />
        </header>

        {/* Main Card */}
        <div className="overflow-hidden rounded-[28px] border border-[#E5E8E2] bg-white shadow-sm">
          {/* Cover */}
          <div className="h-36 animate-pulse bg-[#F4F6F2] sm:h-48" />

          <div className="px-5 pb-6 sm:px-8">
            {/* Avatar + Name */}
            <div className="relative -mt-12 flex flex-col gap-5 sm:-mt-14 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end">
                <div className="h-24 w-24 animate-pulse rounded-3xl border-[5px] border-white bg-[#F4F6F2] shadow-xl sm:h-28 sm:w-28" />
                <div className="space-y-2 pb-1">
                  <div className="h-7 w-40 animate-pulse rounded bg-[#F4F6F2]" />
                  <div className="h-4 w-56 animate-pulse rounded bg-[#F4F6F2]" />
                </div>
              </div>
              <div className="h-10 w-28 animate-pulse rounded-xl bg-[#F4F6F2] sm:pb-1" />
            </div>

            {/* Divider */}
            <div className="my-7 h-px bg-[#F4F6F2]" />

            {/* Account Details */}
            <div className="mb-4 space-y-2">
              <div className="h-5 w-32 animate-pulse rounded bg-[#F4F6F2]" />
              <div className="h-4 w-64 animate-pulse rounded bg-[#F4F6F2]" />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 rounded-2xl border border-[#E8EAE6] bg-[#FAFBF9] p-4"
                >
                  <div className="h-11 w-11 shrink-0 animate-pulse rounded-xl bg-[#F4F6F2]" />
                  <div className="flex-1 space-y-2">
                    <div className="h-3 w-16 animate-pulse rounded bg-[#F4F6F2]" />
                    <div className="h-4 w-32 animate-pulse rounded bg-[#F4F6F2]" />
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="mt-8 mb-4 space-y-2">
              <div className="h-5 w-32 animate-pulse rounded bg-[#F4F6F2]" />
              <div className="h-4 w-64 animate-pulse rounded bg-[#F4F6F2]" />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {Array.from({ length: 2 }).map((_, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-2xl border border-[#E5E8E2] bg-white p-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-11 w-11 animate-pulse rounded-xl bg-[#F4F6F2]" />
                    <div className="space-y-2">
                      <div className="h-4 w-28 animate-pulse rounded bg-[#F4F6F2]" />
                      <div className="h-3 w-36 animate-pulse rounded bg-[#F4F6F2]" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}