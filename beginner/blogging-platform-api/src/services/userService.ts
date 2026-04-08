import * as argon2 from "argon2";
import type { User } from "../types/user";
import { prisma } from "../db/prisma";

export class UserService {
  /// Create a new user
  static async createUser(userData: User) {
    const hashedPassword = await argon2.hash(userData.password);

    return await prisma.user.create({
      data: {
        ...userData,
        password: hashedPassword,
      },
    });
  }
}
