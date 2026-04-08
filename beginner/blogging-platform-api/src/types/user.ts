import { z } from "zod";

export const UserSchema = z
  .object({
    name: z.string().min(2, "Name is too short"),
    username: z.string().min(2, "Username is too short"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  })
  .strict();

export type User = z.infer<typeof UserSchema>;
