import {} from "../controllers/postController";
import { withAuth } from "../middlewares/authMiddleware";
import { withParams } from "../middlewares/paramsValidation";
import { withValidation } from "../middlewares/validation";
import { IdParamSchema } from "../types/common";
import { TagSchema } from "../types/tag";

export const postRoutes = {
  // "/post/:id": {
  //   // Get post by id
  //   // Update post
  //   PATCH: withAuth(
  //     withParams(IdParamSchema, withValidation(TagSchema, updateTag)),
  //   ),
  //   // Delete post
  //   DELETE: withAuth(withParams(IdParamSchema, deleteTag)),
  // },
  // // "/post/:id/:search": {
  // //   // filter posts by name
  // // },
  // "/posts": {
  //   //Create post
  //   POST: withAuth(withValidation(TagSchema, createTag)),
  //   //Get all posts
  //   GET: withAuth(getAllTags),
  // },
};
