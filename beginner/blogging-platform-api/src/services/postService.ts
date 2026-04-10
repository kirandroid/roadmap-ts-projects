import { prisma } from "../db/prisma";
import type { Tag } from "../types/post";

export class PostService {
  static async getTags() {
    return await prisma.tag.findMany();
  }

  static async createTag(tag: Tag) {
    return await prisma.tag.create({
      data: {
        ...tag,
      },
    });
  }

  static async updateTag(id: number, name: string) {
    return await prisma.tag.update({
      where: { id },
      data: { name },
    });
  }

  static async deleteTag(id: number) {
    return await prisma.tag.delete({ where: { id } });
  }
}
