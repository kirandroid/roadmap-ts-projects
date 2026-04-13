import type { AuthenticatedUser } from "../middlewares/authMiddleware";
import { PostService } from "../services/postService";
import type { Post, PostQuery } from "../types/post";

export const createPost = async (
  _req: Request,
  user: AuthenticatedUser,
  validatedData: Post,
) => {
  const post = await PostService.createPost(validatedData, user.userId);
  return Response.json(
    {
      status: "success",
      data: post,
    },
    { status: 201 },
  );
};

export const getPosts = async (_req: Request, _user: any, query: PostQuery) => {
  const posts = await PostService.getPosts(query.search);
  return Response.json({ status: "success", data: posts }, { status: 200 });
};

export const updatePost = async (
  _req: any,
  _user: any,
  validatedData: Post,
  params: { id: number },
): Promise<Response> => {
  await PostService.updatePost(params.id, validatedData);
  return Response.json({ status: "success" }, { status: 200 });
};

export const deletePost = async (
  _req: any,
  _user: any,
  params: { id: number },
): Promise<Response> => {
  await PostService.deletePost(params.id);
  return Response.json({ status: "success" }, { status: 200 });
};

export const getPost = async (
  _req: any,
  _user: any,
  params: { id: number },
): Promise<Response> => {
  const post = await PostService.getPost(params.id);
  return Response.json({ status: "success", data: post }, { status: 200 });
};
