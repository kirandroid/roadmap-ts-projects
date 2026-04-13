import { z } from "zod";

export const CategoryQuerySchema = z.object({
  search: z.string().optional(),
});

export const CategorySchema = z
  .object({
    name: z.string().min(1, "Category name is required"),
  })
  .strict();

export type CategoryQuery = z.infer<typeof CategoryQuerySchema>;
export type Category = z.infer<typeof CategorySchema>;
