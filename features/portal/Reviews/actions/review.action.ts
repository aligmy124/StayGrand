"use server"
import { ApiError } from "@/lib/api-error/ApiError";
import { createReviewSchema, ReviewFormData } from "../schema/review.schema";
import { addReview } from "../service/review.service";

export async function reviewAction(data: ReviewFormData, roomId: string) {
  const result = createReviewSchema.safeParse(data);
  if (!result.success) {
    return {
      success: false,
      message: "Invalid data",
      fieldErrors: result.error?.flatten().fieldErrors,
    };
  }
  try {
    const response = await addReview({...result.data, roomId});
    return {
      success: true,
      message: "Review added successfully",
    };
  } catch (error) {
    if (error instanceof ApiError) {
      return {
        success: false,
        message: error.message || "Failed to add review",
        fieldErrors: error.fieldErrors,
      };
    }
    return {
      success: false,
      message: "Failed to add review",
    };
  }
}
