import {
  type LoginRequest,
  type RefreshRequest,
  type User,
} from "../types/user";
import { UserService } from "../services/userService";
import type { AuthenticatedUser } from "../middlewares/authMiddleware";

export const registerUser = async (
  _req: Request,
  _user: any,
  validatedData: User,
): Promise<Response> => {
  await UserService.createUser(validatedData);
  return Response.json({ status: "success" }, { status: 200 });
};

export const loginUser = async (
  _req: Request,
  _user: any,
  validatedData: LoginRequest,
): Promise<Response> => {
  const result = await UserService.authenticateUser(
    validatedData.username,
    validatedData.password,
  );
  return Response.json({
    status: "success",
    ...result,
  });
};

export const refreshAccessToken = async (
  _req: Request,
  _user: any,
  validatedData: RefreshRequest,
) => {
  const result = await UserService.refreshTokens(validatedData.refreshToken);

  return Response.json({
    status: "success",
    ...result,
  });
};
export const logout = async (req: Request, user: AuthenticatedUser) => {
  await UserService.updateRefreshToken(user.userId, null);
  return Response.json({ status: "success" });
};
