import { prisma } from "../db/prisma";
import type { Post } from "../types/post";

import { AppError } from "../utils/appError";

export class PostService {
  static async getPost(id: number) {
    return await prisma.post.findUnique({
      where: { id },
      include: {
        author: {
          select: { id: true, username: true, lastName: true, firstName: true },
        },
        tags: true,
        categories: true,
      },
    });
  }

  static async getPosts(search?: string) {
    const where = search
      ? {
          OR: [
            { title: { contains: search } },
            { content: { contains: search } },
          ],
        }
      : {};
    return await prisma.post.findMany({
      where: where,
      include: {
        author: {
          select: { id: true, username: true, lastName: true, firstName: true },
        },
        tags: true,
        categories: true,
      },
      orderBy: { createdAt: "desc" },
    });
  }

  static async createPost(post: Post, authorId: number) {
    return await prisma.post.create({
      data: {
        title: post.title,
        content: post.content,
        authorId: authorId,
        categories: {
          connect: post.categories?.map((id) => ({ id })),
        },
        tags: {
          connect: post.tags?.map((id) => ({ id })),
        },
      },
      include: {
        tags: true,
        categories: true,
        author: {
          select: { id: true, lastName: true, firstName: true, username: true },
        },
      },
    });
  }

  static async updatePost(id: number, post: Partial<Post>) {
    return await prisma.post.update({
      where: { id },
      data: {
        title: post.title,
        content: post.content,
        tags: post.tags ? { set: post.tags.map((id) => ({ id })) } : undefined,
        categories: post.categories
          ? { set: post.categories.map((id) => ({ id })) }
          : undefined,
      },
    });
  }

  static async deletePost(id: number) {
    const post = await this.getPost(id);
    if (!post) {
      throw new AppError("Post not found", 404);
    }

    return await prisma.post.delete({ where: { id } });
  }
}
