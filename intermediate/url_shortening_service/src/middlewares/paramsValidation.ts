import { z } from "zod";

export const withParams = (schema: z.ZodSchema, handler: any) => {
  return async (req: any, server?: any, ctx: any = {}): Promise<Response> => {
    const validatedParams = await schema.parseAsync(req.params);
    return await handler(req, server, { ...ctx, params: validatedParams });
  };
};
