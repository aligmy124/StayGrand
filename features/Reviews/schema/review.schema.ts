import { z } from "zod";

export const createReviewSchema = z.object({
  // roomId: z.string().min(1, "Room ID is required"),
  rating: z.number().int().min(1).max(5),
  review: z.string().trim().min(1, "Review is required"),
});

export type ReviewFormData = z.infer<typeof createReviewSchema>;