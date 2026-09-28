import { z } from "zod";

export const updateFacilitySchema = z.object({
  name: z
    .string()
    .nonempty("Facility name is required")
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name cannot exceed 50 characters"),
});

export type UpdateFacilityInput = z.infer<typeof updateFacilitySchema>;