import { ZodError } from "zod";
import { fromError } from "zod-validation-error";
import { AppError } from "../utils/appError";
import { Prisma } from "@prisma/client";

export const globalErrorHandler = (error: Error) => {
  // Handle Prisma Known Errors
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    // P2002 is the code for "Unique constraint failed"
    if (error.code === "P2002") {
      const target = (error.meta?.target as string[]) || ["field"];
      return Response.json(
        {
          status: "failed",
          message: `${target.join(", ")} already exists. Please use another value.`,
        },
        { status: 409 },
      );
    }
  }

  // Handle Zod Errors
  if (error instanceof ZodError) {
    return Response.json(
      {
        status: "fail",
        errors: fromError(error).toString(),
      },
      { status: 400 },
    );
  }

  // Handle Custom App errors
  if (error instanceof AppError) {
    return Response.json(
      {
        status: error.status,
        message: error.message,
      },
      { status: error.statusCode },
    );
  }

  // Handle Unexpected Errors
  console.error(`UNEXPECTED ERROR: ${error}`);
  return Response.json(
    {
      status: "error",
      message: "Something went wrong!",
    },
    { status: 500 },
  );
};
