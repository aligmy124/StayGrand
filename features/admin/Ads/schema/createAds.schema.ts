import { z } from "zod";

export const createAdsSchema = z.object({
  room: z.string().nonempty("Room is required"),
  discount: z.coerce
    .number({ error: "discount is required" })
    .min(0, "discount cannot be negative")
    .max(100, "discount cannot exceed 100"),
  isActive: z.boolean(),
});

export type CreateAdsInput = z.input<typeof createAdsSchema>;
export type CreateAdsData = z.output<typeof createAdsSchema>;