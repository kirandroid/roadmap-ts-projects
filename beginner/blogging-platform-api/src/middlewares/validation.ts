import { z } from "zod";

export const withValidation = (
  schema: z.ZodSchema,
  handler: (req: Request, body: any) => Promise<Response>,
) => {
  return async (req: Request): Promise<Response> => {
    const body = await req.json();
    const validatedData = await schema.parseAsync(body);
    return await handler(req, validatedData);
  };
};
