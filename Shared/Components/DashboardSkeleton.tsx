// components/DashboardSkeleton.tsx

export function DashboardSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Welcome Banner Skeleton */}
      <div className="rounded-2xl bg-gradient-to-r from-[#E8EBE6] to-[#DDE2DB] p-6 h-32" />

      {/* Stats Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="rounded-2xl border border-[#E4E7E2] bg-white p-5"
          >
            <div className="h-3 w-24 bg-[#F4F6F2] rounded" />
            <div className="h-8 w-20 bg-[#F4F6F2] rounded mt-3" />
            <div className="h-3 w-12 bg-[#F4F6F2] rounded mt-2" />
          </div>
        ))}
      </div>

      {/* Recent Activity Skeleton */}
      <div className="rounded-2xl border border-[#E4E7E2] bg-white p-6">
        <div className="h-6 w-40 bg-[#F4F6F2] rounded" />
        <div className="h-4 w-56 bg-[#F4F6F2] rounded mt-2" />
        
        <div className="mt-6 space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-[#F4F6F2]" />
              <div className="flex-1">
                <div className="h-4 w-48 bg-[#F4F6F2] rounded" />
                <div className="h-3 w-32 bg-[#F4F6F2] rounded mt-2" />
              </div>
              <div className="h-4 w-16 bg-[#F4F6F2] rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}