import * as argon2 from "argon2";
import type { User } from "../types/user";
import { prisma } from "../db/prisma";
import jwt from "jsonwebtoken";
import { AppError } from "../utils/appError";

const JWT_SECRET = process.env.JWT_SECRET!;
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

  static async getUserByUsername(username: string) {
    return await prisma.user.findUnique({ where: { username } });
  }

  static async updateRefreshToken(userId: number, refreshToken: string | null) {
    return await prisma.user.update({
      where: { id: userId },
      data: { refreshToken },
    });
  }

  static async generateAndSaveTokens(userId: number) {
    const accessToken = jwt.sign({ userId }, JWT_SECRET, { expiresIn: "15m" });
    const refreshToken = jwt.sign({ userId }, JWT_SECRET, { expiresIn: "7d" });

    await this.updateRefreshToken(userId, refreshToken);
    return { accessToken, refreshToken };
  }

  static async authenticateUser(username: string, password: string) {
    const user = await this.getUserByUsername(username);
    if (!user || !(await argon2.verify(user.password, password))) {
      throw new AppError("Invalid username or password", 401);
    }
    const tokens = await this.generateAndSaveTokens(user.id);
    return {
      ...tokens,
      user: { id: user.id, name: user.name, username: user.username },
    };
  }

  // Handle Refresh Logic
  static async refreshTokens(refreshToken: string) {
    try {
      const decoded = jwt.verify(refreshToken, JWT_SECRET) as {
        userId: number;
      };
      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
      });

      if (!user || user.refreshToken !== refreshToken) {
        throw new AppError("Invalid refresh token", 403);
      }

      // We only need to issue a new Access Token, but we can also rotate the refresh token here if desired
      const newAccessToken = jwt.sign({ userId: user.id }, JWT_SECRET, {
        expiresIn: "15m",
      });

      return { accessToken: newAccessToken };
    } catch (error) {
      throw new AppError("Refresh token expired or invalid", 403);
    }
  }
}
