import { z } from "zod";

export const TagSchema = z
  .object({
    name: z.string().min(1, "Tag name is required"),
  })
  .strict();

export const CategorySchema = z
  .object({
    name: z.string().min(1, "Category name is required"),
  })
  .strict();

export type Tag = z.infer<typeof TagSchema>;
export type Category = z.infer<typeof CategorySchema>;
