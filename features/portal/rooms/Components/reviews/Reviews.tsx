import { getToken } from "@/lib/cookies/cookies";
import ReviewForm from "@/features/portal/Reviews/components/ReviewForm";
import ReviewList from "@/features/portal/Reviews/components/ReviewList";
import { Suspense } from "react";
import SkeletonReviews from "@/Shared/Components/SkeletonReviews";

interface ReviewsProps {
  roomId: string;
}

export default async function Reviews({ roomId }: ReviewsProps) {
  const token = await getToken();

  if (!token) {
    return <LoginRequired />;
  }

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#4E604F]/20 to-transparent" />

        <h2 className="text-2xl font-bold text-[#1B1C1C] flex items-center gap-2">
          <span className="text-[#4E604F]">✦</span>
          Guest Reviews
        </h2>

        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#4E604F]/20 to-transparent" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Review List */}
        <div className="lg:col-span-2">
          <Suspense fallback={<SkeletonReviews />}>
            <ReviewList roomId={roomId} />
          </Suspense>
        </div>

        {/* Review Form */}
        <div className="lg:col-span-1">
          <ReviewForm roomId={roomId} />
        </div>
      </div>
    </div>
  );
}

function LoginRequired() {
  return (
    <div className="rounded-2xl border border-[#4E604F]/10 bg-white p-8 text-center shadow-sm">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#4E604F]/10">
        🔒
      </div>

      <h3 className="mt-4 text-lg font-bold text-[#1B1C1C]">
        Login to access reviews
      </h3>

      <p className="mt-2 text-sm text-[#434842]/60">
        Please login to view and write reviews for this room.
      </p>

      <a
        href="/login"
        className="mt-5 inline-flex rounded-xl bg-[#4E604F] px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
      >
        Login
      </a>
    </div>
  );
}
