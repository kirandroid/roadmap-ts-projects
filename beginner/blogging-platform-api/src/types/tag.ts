import { z } from "zod";

export const TagSchema = z
  .object({
    name: z.string().min(1, "Tag name is required"),
  })
  .strict();

export const TagQuerySchema = z.object({
  search: z.string().optional(),
});

export type Tag = z.infer<typeof TagSchema>;
export type TagQuery = z.infer<typeof TagQuerySchema>;
