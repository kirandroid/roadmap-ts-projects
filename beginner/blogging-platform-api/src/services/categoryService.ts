import { prisma } from "../db/prisma";
import type { Category } from "../types/category";
import { AppError } from "../utils/appError";

export class CategoryService {
  static async getCategory(id: number) {
    return await prisma.category.findUnique({ where: { id } });
  }

  static async getCategories(searchTerm?: string) {
    return await prisma.category.findMany({
      where: {
        name: {
          contains: searchTerm,
        },
      },
    });
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
