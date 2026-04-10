import { z } from "zod";

export const UserSchema = z
  .object({
    username: z.string().min(2, "Username is too short"),
    firstName: z.string().min(2, "First Name is too short"),
    lastName: z.string().min(2, "Last Name is too short"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  })
  .strict();

export const LoginSchema = z
  .object({
    username: z.string().min(2, "Invalid username"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  })
  .strict();

export const RefreshSchema = z.object({
  refreshToken: z.string().min(1, "Refresh token is required"),
});

export type User = z.infer<typeof UserSchema>;
export type LoginRequest = z.infer<typeof LoginSchema>;
export type RefreshRequest = z.infer<typeof RefreshSchema>;
