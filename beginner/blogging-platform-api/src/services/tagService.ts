import { prisma } from "../db/prisma";
import type { Tag } from "../types/tag";
import { AppError } from "../utils/appError";

export class TagService {
  static async getTag(id: number) {
    return await prisma.tag.findUnique({ where: { id } });
  }

  static async getTags(searchTerm?: string) {
    return await prisma.tag.findMany({
      where: {
        name: {
          contains: searchTerm,
        },
      },
    });
  }

  static async createTag(tag: Tag) {
    return await prisma.tag.create({
      data: {
        ...tag,
      },
    });
  }

  static async updateTag(id: number, name: string) {
    const tag = await this.getTag(id);
    if (!tag) {
      throw new AppError("Tag not found", 404);
    }
    return await prisma.tag.update({
      where: { id },
      data: { name },
    });
  }

  static async deleteTag(id: number) {
    return await prisma.tag.delete({ where: { id } });
  }

  static async searchTag(name: string) {
    return await prisma.tag.findMany({ where: { name } });
  }
}
