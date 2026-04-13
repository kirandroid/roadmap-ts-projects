import { z } from "zod";

export const withQuery = (schema: z.ZodSchema, handler: any) => {
  return async (req: Request, ...args: any[]): Promise<Response> => {
    const url = new URL(req.url);
    const queryParams = Object.fromEntries(url.searchParams.entries());
    const validatedQuery = await schema.parseAsync(queryParams);
    return await handler(req, ...args, validatedQuery);
  };
};
