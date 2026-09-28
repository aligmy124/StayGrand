import { z } from "zod";

export const createFacilitySchema = z.object({
  name: z
    .string()
    .nonempty("Facility name is required")
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name cannot exceed 50 characters"),
});

export type CreateFacilityInput = z.infer<typeof createFacilitySchema>;