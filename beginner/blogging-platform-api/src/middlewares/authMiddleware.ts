import { AppError } from "../utils/appError";
import jwt from "jsonwebtoken";

export interface AuthenticatedUser {
  userId: number;
  userName: string;
}

export const withAuth = (
  handler: (
    req: Request,
    user: AuthenticatedUser,
    validatedData?: any,
  ) => Promise<Response>,
) => {
  return async (req: Request, validatedData?: any): Promise<Response> => {
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.split(" ")[1];

    if (!token) {
      throw new AppError("Unauthorized: No token provided", 401);
    }

    let decoded;
    try {
      decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || "fallback-secret",
      ) as AuthenticatedUser;
    } catch (error) {
      throw new AppError("Unauthorized: Invalid or expired token", 401);
    }

    return await handler(req, decoded, validatedData);
  };
};
