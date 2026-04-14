import z from "zod";

export const UrlParamSchema = z
  .object({
    slug: z.string().min(1),
  })
  .strict();

export const UpdateUrlSchema = z.object({
  targetUrl: z.url("Invalid destination URL"),
});

export type UrlParams = z.infer<typeof UrlParamSchema>;
export type UpdateUrlBody = z.infer<typeof UpdateUrlSchema>;
