import {
  createCategory,
  deleteCategory,
  getAllCategory,
  updateCategory,
} from "../controllers/categoryController";
import { withAuth } from "../middlewares/authMiddleware";
import { withParams } from "../middlewares/paramsValidation";
import { withValidation } from "../middlewares/validation";
import { IdParamSchema } from "../types/common";
import { CategoryQuerySchema, CategorySchema } from "../types/category";
import { withQuery } from "../middlewares/queryValidation";

export const categoryRoutes = {
  "/category/:id": {
    PATCH: withAuth(
      withParams(IdParamSchema, withValidation(CategorySchema, updateCategory)),
    ),
    DELETE: withAuth(withParams(IdParamSchema, deleteCategory)),
  },
  "/categories": {
    POST: withAuth(withValidation(CategorySchema, createCategory)),
    GET: withAuth(withQuery(CategoryQuerySchema, getAllCategory)),
  },
};
