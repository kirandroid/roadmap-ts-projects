import type { BunRequest } from "bun";
import { UserSchema, type User } from "../types/user";
import { UserService } from "../services/userService";

export const registerUser = async (
  req: Request,
  validatedData: User,
): Promise<Response> => {
  await UserService.createUser(validatedData);
  return Response.json({ status: "success" }, { status: 200 });
};
