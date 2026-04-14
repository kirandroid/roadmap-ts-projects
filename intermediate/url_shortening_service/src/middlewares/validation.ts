import { z } from "zod";

export const withValidation = (
  schema: z.ZodSchema,
  handler: (
    req: Request,
    user: any,
    body: any,
    params?: any,
  ) => Promise<Response>,
) => {
  return async (req: Request, user?: any, params?: any): Promise<Response> => {
    const body = await req.json();
    const validatedData = await schema.parseAsync(body);
    return await handler(req, user, validatedData, params);
  };
};
