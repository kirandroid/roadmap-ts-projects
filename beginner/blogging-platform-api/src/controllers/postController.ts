import { PostService } from "../services/postService";
import type { Tag } from "../types/post";

export const createTag = async (
  _req: Request,
  _user: any,
  validatedData: Tag,
): Promise<Response> => {
  await PostService.createTag(validatedData);
  return Response.json({ status: "success" }, { status: 200 });
};

export const getAllTags = async (
  _req: Request,
  _user: any,
): Promise<Response> => {
  const allTags = await PostService.getTags();

  return Response.json(
    {
      status: "success",
      data: allTags,
    },
    { status: 200 },
  );
};

export const updateTag = async (
  _req: any,
  _user: any,
  validatedData: Tag,
  params: { id: number },
): Promise<Response> => {
  await PostService.updateTag(params.id, validatedData.name);
  return Response.json({ status: "success" }, { status: 200 });
};

export const deleteTag = async (
  _req: any,
  _user: any,
  params: { id: number },
): Promise<Response> => {
  await PostService.deleteTag(params.id);
  return Response.json({ status: "success" }, { status: 200 });
};
