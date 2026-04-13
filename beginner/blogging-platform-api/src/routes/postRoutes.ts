import {
  createPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
} from "../controllers/postController";
import { withAuth } from "../middlewares/authMiddleware";
import { withParams } from "../middlewares/paramsValidation";
import { withQuery } from "../middlewares/queryValidation";
import { withValidation } from "../middlewares/validation";
import { IdParamSchema } from "../types/common";
import { PostQuerySchema, PostSchema } from "../types/post";
import { TagSchema } from "../types/tag";

export const postRoutes = {
  "/post/:id": {
    // Get post by id
    // Update post
    PATCH: withAuth(
      withParams(IdParamSchema, withValidation(PostSchema, updatePost)),
    ),
    // Delete post
    DELETE: withAuth(withParams(IdParamSchema, deletePost)),
    //Get post
    GET: withAuth(withParams(IdParamSchema, getPost)),
  },
  "/posts": {
    //Create post
    POST: withAuth(withValidation(PostSchema, createPost)),
    //Get all posts
    GET: withAuth(withQuery(PostQuerySchema, getPosts)),
  },
};
