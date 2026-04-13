import { z } from "zod";

export const PostSchema = z
  .object({
    title: z.string().min(1, "Title is required"),
    content: z.string().min(1, "Content is required"),
    categories: z.array(z.number()).optional(),
    tags: z.array(z.number()).optional(),
  })
  .strict();

export const PostQuerySchema = z.object({
  search: z.string().optional(),
});

export type Post = z.infer<typeof PostSchema>;
export type PostQuery = z.infer<typeof PostQuerySchema>;
