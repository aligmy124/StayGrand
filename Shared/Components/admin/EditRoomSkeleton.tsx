export default function EditRoomSkeleton() {
  return (
    <div className="space-y-6">
      {/* Basic Info Section */}
      <div className="rounded-2xl border border-[#E4E7E2] bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-center gap-3 border-b border-[#F4F6F2] pb-4">
          <div className="h-9 w-9 animate-pulse rounded-lg bg-[#F0F3EE]" />
          <div className="space-y-1.5">
            <div className="h-4 w-32 animate-pulse rounded bg-[#F0F3EE]" />
            <div className="h-3 w-48 animate-pulse rounded bg-[#F4F6F2]" />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2 sm:col-span-2">
            <div className="h-3.5 w-24 animate-pulse rounded bg-[#F0F3EE]" />
            <div className="h-11 w-full animate-pulse rounded-md bg-[#F4F6F2]" />
          </div>
          <div className="space-y-2">
            <div className="h-3.5 w-16 animate-pulse rounded bg-[#F0F3EE]" />
            <div className="h-11 w-full animate-pulse rounded-md bg-[#F4F6F2]" />
          </div>
          <div className="space-y-2">
            <div className="h-3.5 w-20 animate-pulse rounded bg-[#F0F3EE]" />
            <div className="h-11 w-full animate-pulse rounded-md bg-[#F4F6F2]" />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <div className="h-3.5 w-20 animate-pulse rounded bg-[#F0F3EE]" />
            <div className="h-11 w-full animate-pulse rounded-md bg-[#F4F6F2]" />
          </div>
        </div>
      </div>

      {/* Facilities Section */}
      <div className="rounded-2xl border border-[#E4E7E2] bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-center gap-3 border-b border-[#F4F6F2] pb-4">
          <div className="h-9 w-9 animate-pulse rounded-lg bg-[#F0F3EE]" />
          <div className="space-y-1.5">
            <div className="h-4 w-20 animate-pulse rounded bg-[#F0F3EE]" />
            <div className="h-3 w-56 animate-pulse rounded bg-[#F4F6F2]" />
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-9 w-24 animate-pulse rounded-lg bg-[#F4F6F2]"
            />
          ))}
        </div>
      </div>

      {/* Images Section */}
      <div className="rounded-2xl border border-[#E4E7E2] bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-center gap-3 border-b border-[#F4F6F2] pb-4">
          <div className="h-9 w-9 animate-pulse rounded-lg bg-[#F0F3EE]" />
          <div className="space-y-1.5">
            <div className="h-4 w-24 animate-pulse rounded bg-[#F0F3EE]" />
            <div className="h-3 w-64 animate-pulse rounded bg-[#F4F6F2]" />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-5">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="aspect-square animate-pulse rounded-xl bg-[#F4F6F2]"
            />
          ))}
        </div>
        <div className="mt-4 h-32 w-full animate-pulse rounded-xl bg-[#F4F6F2]" />
      </div>

      {/* Actions */}
      <div className="flex flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="h-11 w-28 animate-pulse rounded-xl bg-[#F4F6F2]" />
        <div className="h-11 w-40 animate-pulse rounded-xl bg-[#F4F6F2]" />
      </div>
    </div>
  );
}