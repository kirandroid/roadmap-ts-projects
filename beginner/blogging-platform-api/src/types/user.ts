import { z } from "zod";

export const UserSchema = z
  .object({
    username: z.string().min(2, "Name is too short"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  })
  .strict();
