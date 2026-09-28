import { z } from "zod";

export const updateRoomSchema = z.object({
  roomNumber: z.string().nonempty("roomNumber is required"),

  price: z.coerce
    .number({ error: "price is required" })
    .positive("price must be greater than 0"),

  discount: z.coerce
    .number({ error: "discount is required" })
    .min(0, "discount cannot be negative")
    .max(100, "discount cannot exceed 100"),

  capacity: z.coerce
    .number({ error: "capacity is required" })
    .int("capacity must be an integer")
    .positive("capacity must be greater than 0"),

  facilities: z.array(z.string()),
});

export type UpdateFormInput = z.input<typeof updateRoomSchema>;
export type UpdateFormDataRoom = z.output<typeof updateRoomSchema>;
