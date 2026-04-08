import { z } from "zod";

export const withValidation = (
  schema: z.ZodSchema,
  handler: (req: Request, body: any) => Promise<Response>,
) => {
  return async (req: Request): Promise<Response> => {
    try {
      const body = await req.json();
      const validatedData = await schema.parseAsync(body);
      return await handler(req, validatedData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return Response.json(
          {
            status: "fail",
            errors: z.treeifyError(error),
          },
          { status: 400 },
        );
      }
      return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
  };
};
