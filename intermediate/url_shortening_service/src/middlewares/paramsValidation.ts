import { z } from "zod";

export const withParams = (schema: z.ZodSchema, handler: any) => {
  return async (req: any, user?: any): Promise<Response> => {
    const validatedParams = await schema.parseAsync(req.params);
    return await handler(req, user, validatedParams);
  };
};
