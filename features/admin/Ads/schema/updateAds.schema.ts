import z from "zod";

export const UpdateSchema = z.object({
  discount: z.coerce.number().min(0).max(100),
  isActive: z.coerce.boolean(),
});

export type UpdateDataInput = z.input<typeof UpdateSchema>;
export type UpdateFormDataAds = z.output<typeof UpdateSchema>; 
