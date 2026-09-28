// features/Reviews/Components/ReviewList.tsx
import {
  Star,
  Users,
  Calendar,
  ThumbsUp,
  Award,
  TrendingUp,
} from "lucide-react";
import { formatRelativeDate, getInitials } from "@/lib/utils";
import { getReview } from "@/features/portal/Reviews/service/review.service";
import { PopulatedRoomReview } from "@/features/portal/Reviews/types/types";
import { cn } from "@/lib/utils";

interface ReviewListProps {
  roomId: string;
}

export default async function ReviewList({ roomId }: ReviewListProps) {
  const response = await getReview(roomId);
  const reviews: PopulatedRoomReview[] = response?.data?.roomReviews || [];
  const totalCount = response?.data?.totalCount || 0;

  // Calculate average rating
  const averageRating =
    reviews.length > 0
      ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
      : 0;

  // Rating distribution
  const ratingDistribution = [5, 4, 3, 2, 1].map((stars) => ({
    stars,
    count: reviews.filter((r) => r.rating === stars).length,
    percentage:
      reviews.length > 0
        ? (reviews.filter((r) => r.rating === stars).length / reviews.length) *
          100
        : 0,
  }));

  // Calculate review stats
  const totalReviews = reviews.length;
  const positiveReviews = reviews.filter((r) => r.rating >= 4).length;
  const positivePercentage =
    totalReviews > 0 ? (positiveReviews / totalReviews) * 100 : 0;

  if (reviews.length === 0) {
    return (
      <div className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-xl md:p-8 border border-[#4E604F]/5">
        {/* Decorative Elements */}
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#4E604F]/5 blur-2xl" />
        <div className="absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-[#4E604F]/5 blur-2xl" />

        <div className="relative">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#434842] flex items-center gap-2">
              <span className="h-px w-8 bg-[#4E604F]/30" />
              Reviews
              <span className="h-px w-8 bg-[#4E604F]/30" />
            </h3>
            <span className="text-sm text-[#434842]/50">0 reviews</span>
          </div>
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#4E604F]/5 mb-4">
              <Star className="h-10 w-10 text-[#4E604F]/30" />
            </div>
            <h4 className="text-lg font-semibold text-[#1B1C1C]">
              No Reviews Yet
            </h4>
            <p className="mt-2 text-sm text-[#434842]/60 max-w-sm mx-auto">
              Be the first to share your experience and help others discover
              this amazing room!
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-xl md:p-8 border border-[#4E604F]/5">
      {/* Premium Background Effects */}
      <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#4E604F]/5 blur-3xl" />
      <div className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-[#4E604F]/5 blur-3xl" />

      <div className="relative">
        {/* Header with Rating Summary */}
        <div className="flex flex-col lg:flex-row lg:items-center gap-6 mb-6 pb-6 border-b border-[#4E604F]/10">
          {/* Left - Rating Score */}
          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-[#1B1C1C] leading-none">
                {averageRating.toFixed(1)}
              </div>
              <div className="flex items-center justify-center gap-0.5 mt-1.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "h-4 w-4",
                      i < Math.round(averageRating)
                        ? "fill-[#F59E0B] text-[#F59E0B]"
                        : "text-gray-200",
                    )}
                  />
                ))}
              </div>
              <p className="mt-1 text-xs text-[#434842]/50">
                {totalCount} {totalCount === 1 ? "review" : "reviews"}
              </p>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2 text-sm text-[#434842]/70">
                <ThumbsUp className="h-4 w-4 text-[#4E604F]" />
                <span>{positivePercentage.toFixed(0)}% recommend</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#434842]/70">
                <TrendingUp className="h-4 w-4 text-[#4E604F]" />
                <span>Great value</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#434842]/70">
                <Award className="h-4 w-4 text-[#4E604F]" />
                <span>Verified guests</span>
              </div>
            </div>
          </div>

          {/* Right - Rating Distribution */}
          <div className="flex-1 max-w-xs space-y-1.5">
            {ratingDistribution.map(({ stars, count, percentage }) => (
              <div key={stars} className="flex items-center gap-3">
                <span className="text-xs font-medium text-[#434842]/60 w-6">
                  {stars}★
                </span>
                <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${percentage}%`,
                      background: `linear-gradient(90deg, #4E604F, #6B8F6D)`,
                    }}
                  />
                </div>
                <span className="text-xs text-[#434842]/40 w-8 text-right">
                  {count}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-4">
          {reviews.map((review, index) => (
            <div
              key={review._id}
              className="group relative rounded-xl border border-[#4E604F]/10 p-5 transition-all hover:border-[#4E604F]/30 hover:shadow-md"
            >
              {/* Premium Accent Line */}
              <div className="absolute left-0 top-0 h-full w-1 rounded-l-xl bg-gradient-to-b from-[#4E604F]/30 via-[#4E604F]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  {/* Avatar */}
                  <div className="relative">
                    <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#4E604F] to-[#6B8F6D] text-white font-bold text-sm shadow-md">
                      {getInitials(review.user?.userName || "U")}
                    </div>
                    {/* Verified Badge */}
                    <div className="absolute -bottom-0.5 -right-0.5 rounded-full bg-emerald-500 p-0.5 border-2 border-white">
                      <svg
                        className="h-2.5 w-2.5 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-[#1B1C1C]">
                        {review.user?.userName || "Anonymous User"}
                      </h4>
                      <span className="text-[10px] font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                        Verified
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={cn(
                              "h-3.5 w-3.5",
                              i < review.rating
                                ? "fill-[#F59E0B] text-[#F59E0B]"
                                : "text-gray-200",
                            )}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-[#434842]/40">
                        • {formatRelativeDate(review.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Helpful Button */}
                <button className="flex items-center gap-1.5 text-xs text-[#434842]/40 hover:text-[#4E604F] transition px-3 py-1.5 rounded-full bg-[#4E604F]/5 hover:bg-[#4E604F]/10">
                  <ThumbsUp className="h-3.5 w-3.5" />
                  Helpful
                </button>
              </div>

              <p className="mt-3 text-sm text-[#434842]/80 leading-relaxed">
                {review.review}
              </p>

              {/* Review Footer */}
              <div className="mt-3 flex items-center gap-4 text-xs text-[#434842]/30">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {new Date(review.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  Stayed here
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
