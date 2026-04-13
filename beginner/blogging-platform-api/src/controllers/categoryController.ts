import type { Category } from "@prisma/client";
import { CategoryService } from "../services/categoryService";
import type { CategoryQuery } from "../types/category";

export const createCategory = async (
  _req: Request,
  _user: any,
  validatedData: Category,
): Promise<Response> => {
  await CategoryService.createCategory(validatedData);
  return Response.json({ status: "success" }, { status: 200 });
};

export const getAllCategory = async (
  _req: Request,
  _user: any,
  query: CategoryQuery,
): Promise<Response> => {
  console.log(query.search);

  const allCategories = await CategoryService.getCategories(query.search);

  return Response.json(
    {
      status: "success",
      data: allCategories,
    },
    { status: 200 },
  );
};

export const updateCategory = async (
  _req: any,
  _user: any,
  validatedData: Category,
  params: { id: number },
): Promise<Response> => {
  await CategoryService.updateCategory(params.id, validatedData.name);
  return Response.json({ status: "success" }, { status: 200 });
};

export const deleteCategory = async (
  _req: any,
  _user: any,
  params: { id: number },
): Promise<Response> => {
  await CategoryService.deleteCategory(params.id);
  return Response.json({ status: "success" }, { status: 200 });
};
