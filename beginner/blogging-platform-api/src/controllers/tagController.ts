import type { Tag } from "@prisma/client";
import { TagService } from "../services/tagService";
import type { TagQuery } from "../types/tag";

export const createTag = async (
  _req: Request,
  _user: any,
  validatedData: Tag,
): Promise<Response> => {
  await TagService.createTag(validatedData);
  return Response.json({ status: "success" }, { status: 200 });
};

export const getAllTags = async (
  _req: Request,
  _user: any,
  query: TagQuery,
): Promise<Response> => {
  const allTags = await TagService.getTags(query.search);

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
  await TagService.updateTag(params.id, validatedData.name);
  return Response.json({ status: "success" }, { status: 200 });
};

export const deleteTag = async (
  _req: any,
  _user: any,
  params: { id: number },
): Promise<Response> => {
  await TagService.deleteTag(params.id);
  return Response.json({ status: "success" }, { status: 200 });
};
