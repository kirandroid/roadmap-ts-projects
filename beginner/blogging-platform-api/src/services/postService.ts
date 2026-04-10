import { prisma } from "../db/prisma";
import type { Category, Tag } from "../types/post";
import { AppError } from "../utils/appError";

export class PostService {
  static async getTag(id: number) {
    return await prisma.tag.findUnique({ where: { id } });
  }
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

  static async getCategory(id: number) {
    return await prisma.category.findUnique({ where: { id } });
  }

  static async getCategories() {
    return await prisma.category.findMany();
  }

  static async createCategory(category: Category) {
    return await prisma.category.create({
      data: {
        ...category,
      },
    });
  }

  static async updateCategory(id: number, name: string) {
    return await prisma.category.update({
      where: { id },
      data: { name },
    });
  }

  static async deleteCategory(id: number) {
    const category = await this.getCategory(id);
    if (!category) {
      throw new AppError("Category not found", 404);
    }

    return await prisma.category.delete({ where: { id } });
  }
}
