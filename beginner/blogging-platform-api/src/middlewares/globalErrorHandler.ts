import { ZodError } from "zod";
import { fromError } from "zod-validation-error";
import { AppError } from "../utils/appError";

export const globalErrorHandler = (error: Error) => {
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
