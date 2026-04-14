import { z } from "zod";

export const withValidation = (schema: z.ZodSchema, handler: any) => {
  return async (
    req: Request,
    server?: any,
    ctx: any = {},
  ): Promise<Response> => {
    const body = await req.json();
    const validatedData = await schema.parseAsync(body);
    return await handler(req, server, { ...ctx, body: validatedData });
  };
};
