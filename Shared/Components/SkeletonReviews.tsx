export default function SkeletonReviews() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-xl md:p-8 border border-[#4E604F]/5 animate-pulse">
      <div className="h-8 bg-gray-200 rounded-lg w-48 mb-4" />

      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="border border-[#4E604F]/10 rounded-xl p-4"
          >
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-full bg-gray-200" />

              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-32" />
                <div className="h-3 bg-gray-200 rounded w-24 mt-1" />
              </div>
            </div>

            <div className="mt-3 space-y-2">
              <div className="h-3 bg-gray-200 rounded w-full" />
              <div className="h-3 bg-gray-200 rounded w-3/4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}