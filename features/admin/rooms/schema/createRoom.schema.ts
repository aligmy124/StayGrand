import { z } from "zod";

export const createRoomSchema = z.object({
  roomNumber: z.string().nonempty("roomNumber is required"),
  price: z.coerce.number().positive("price must be greater than 0"),
  discount: z.coerce.number().min(0).max(100),
  capacity: z.coerce.number().int().positive(),
  facilities: z.array(z.string()).min(1, "select at least one facility"),
});

export type CreateFormInput = z.input<typeof createRoomSchema>;
export type CreateFormDataRoom = z.output<typeof createRoomSchema>;