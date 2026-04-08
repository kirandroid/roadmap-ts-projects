import type { BunRequest } from "bun";
import { UserSchema } from "../types/user";

export const registerUser = async (
  req: Request,
  validatedData: any,
): Promise<Response> => {
  console.log(validatedData);
  //  await UserService.createUser(validatedData);
  return Response.json({ status: "success" }, { status: 200 });
};
