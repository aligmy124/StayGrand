// features/Reviews/Components/ReviewForm.tsx
"use client";

import { useState } from "react";
import { Star, Send, Sparkles, MessageSquare, Smile, Calendar } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { createReviewSchema, ReviewFormData } from "../schema/review.schema";
import { reviewAction } from "../actions/review.action";

interface RProps {
  roomId: string;
}

const ratingLabels = {
  1: "Poor",
  2: "Fair",
  3: "Good",
  4: "Very Good",
  5: "Excellent",
};

export default function ReviewForm({ roomId }: RProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
    setValue,
    watch,
  } = useForm<ReviewFormData>({
    resolver: zodResolver(createReviewSchema),
    defaultValues: {
      rating: 0,
      review: "",
    },
  });

  const [hoverRating, setHoverRating] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();

  const rating = watch("rating");
  const review = watch("review");

  const onSubmit = async (data: ReviewFormData) => {
    try {
      const result = await reviewAction(data, roomId);

      if (!result.success) {
        if (result.fieldErrors) {
          Object.entries(result.fieldErrors).forEach(([field, messages]) => {
            if (!messages?.[0]) return;
            setError(field as keyof ReviewFormData, {
              type: "manual",
              message: messages[0],
            });
          });
        }
        toast.error(result.message);
        return;
      }

      toast.success(result.message);
      router.refresh();
      reset();
      setHoverRating(0);
    } catch (error) {
      toast.error("Failed to submit review. Please try again.");
      setError("root", {
        type: "manual",
        message: "Failed to submit review. Please try again.",
      });
    }
  };

  const handleRatingClick = (star: number) => {
    setValue("rating", star, { shouldValidate: true, shouldDirty: true });
  };

  const getRatingLabel = () => {
    const currentRating = hoverRating || rating;
    return currentRating > 0 ? ratingLabels[currentRating as keyof typeof ratingLabels] : "Select rating";
  };

  return (
    <div className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-xl md:p-8 border border-[#4E604F]/5">
      {/* Premium Background Effects */}
      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#4E604F]/5 blur-2xl" />
      <div className="absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-[#4E604F]/5 blur-2xl" />

      <div className="relative">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 rounded-xl bg-[#4E604F]/10">
            <MessageSquare className="h-5 w-5 text-[#4E604F]" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#1B1C1C]">Share Your Experience</h3>
            <p className="text-sm text-[#434842]/50 flex items-center gap-1">
              <Smile className="h-3.5 w-3.5" />
              Your feedback helps others make better choices
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Star Rating - Premium Design */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium text-[#434842] flex items-center gap-2">
                <Star className="h-4 w-4 text-[#F59E0B]" />
                Your Rating
                <span className="text-red-500">*</span>
              </label>
              <span className={cn(
                "text-sm font-medium transition-all",
                (hoverRating || rating) > 0 ? "text-[#F59E0B]" : "text-[#434842]/40"
              )}>
                {getRatingLabel()}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => handleRatingClick(star)}
                  className="group relative transition-transform hover:scale-110 focus:outline-none"
                  aria-label={`Rate ${star} stars`}
                >
                  <Star
                    className={cn(
                      "h-10 w-10 md:h-12 md:w-12 transition-all",
                      star <= (hoverRating || rating)
                        ? "fill-[#F59E0B] text-[#F59E0B] drop-shadow-md"
                        : "text-gray-200 hover:text-gray-300"
                    )}
                  />
                  {/* Star Number */}
                  <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[8px] font-medium text-[#434842]/30">
                    {star}
                  </span>
                </button>
              ))}
            </div>

            {errors.rating && (
              <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                <span className="h-1 w-1 rounded-full bg-red-500" />
                {errors.rating.message}
              </p>
            )}
          </div>

          {/* Review Textarea - Premium */}
          <div className="mb-6">
            <label
              htmlFor="review"
              className="mb-2 block text-sm font-medium text-[#434842] flex items-center gap-2"
            >
              <Sparkles className="h-4 w-4 text-[#4E604F]" />
              Your Review
              <span className="text-red-500">*</span>
            </label>
            <div className={cn(
              "relative rounded-xl border transition-all",
              isFocused ? "border-[#4E604F] shadow-lg shadow-[#4E604F]/10" : "border-[#4E604F]/20",
              errors.review && "border-red-500"
            )}>
              <textarea
                id="review"
                {...register("review")}
                placeholder="Tell us about your experience... What did you like? Any suggestions?"
                rows={4}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className={cn(
                  "w-full rounded-xl bg-white/50 px-4 py-3 text-sm text-[#1B1C1C] placeholder-[#434842]/40 outline-none resize-none",
                  isFocused ? "bg-white" : "bg-white/50"
                )}
              />
              
              {/* Character Counter */}
              <div className="absolute bottom-3 right-3">
                <span className={cn(
                  "text-xs transition-all",
                  review?.length > 0 ? "text-[#434842]/50" : "text-[#434842]/30"
                )}>
                  {review?.length || 0} characters
                </span>
              </div>
            </div>
            
            {errors.review ? (
              <p className="mt-1 text-xs text-red-500">{errors.review.message}</p>
            ) : (
              <p className="mt-1 text-xs text-[#434842]/30">
                Minimum 10 characters • Share your honest experience
              </p>
            )}
          </div>

          {/* Submit Button - Premium */}
          <div className="flex w-full items-center justify-center">
            <button
              type="submit"
              disabled={isSubmitting || rating === 0 || !review?.trim()}
              className="cursor-pointer inline-flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-[#4E604F] to-[#6B8F6D] px-8 py-3.5 text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-[#4E604F]/30 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100 active:scale-95"
            aria-label="Submit Review"
            >
              {isSubmitting ? (
                <>
                  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Submit Review
                </>
              )}
            </button>
          </div>

          {/* Global Error */}
          {errors.root && (
            <p className="mt-3 text-sm text-red-500 flex items-center gap-1">
              <span className="h-1 w-1 rounded-full bg-red-500" />
              {errors.root.message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}