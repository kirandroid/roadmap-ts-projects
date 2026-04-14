import z from "zod";

export const UrlSchema = z
  .object({
    url: z.string().min(1, "URL is required"),
  })
  .strict();

export type Url = z.infer<typeof UrlSchema>;
