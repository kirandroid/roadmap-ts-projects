import {
  createTag,
  deleteTag,
  getAllTags,
  updateTag,
} from "../controllers/tagController";
import { withAuth } from "../middlewares/authMiddleware";
import { withParams } from "../middlewares/paramsValidation";
import { withQuery } from "../middlewares/queryValidation";
import { withValidation } from "../middlewares/validation";
import { IdParamSchema } from "../types/common";
import { TagQuerySchema, TagSchema } from "../types/tag";

export const tagRoutes = {
  "/tag/:id": {
    PATCH: withAuth(
      withParams(IdParamSchema, withValidation(TagSchema, updateTag)),
    ),
    DELETE: withAuth(withParams(IdParamSchema, deleteTag)),
  },
  "/tags": {
    POST: withAuth(withValidation(TagSchema, createTag)),
    GET: withAuth(withQuery(TagQuerySchema, getAllTags)),
  },
};
