import {
  loginUser,
  logout,
  refreshAccessToken,
  registerUser,
} from "./src/controllers/authControllers";
import { withValidation } from "./src/middlewares/validation";
import { LoginSchema, RefreshSchema, UserSchema } from "./src/types/user";
import type { BunRequest } from "bun";
import index from "./src/views/index.html";
import { globalErrorHandler } from "./src/middlewares/globalErrorHandler";
import { withAuth } from "./src/middlewares/authMiddleware";
import { CategorySchema, TagSchema } from "./src/types/post";
import {
  createCategory,
  createTag,
  deleteCategory,
  deleteTag,
  getAllCategory,
  getAllTags,
  updateCategory,
  updateTag,
} from "./src/controllers/postController";
import { withParams } from "./src/middlewares/paramsValidation";
import { IdParamSchema } from "./src/types/common";

const dbUrl = process.env.DATABASE_URL;

if (!dbUrl) {
  console.error("DATABASE_URL is not defined in .env");
  process.exit(1);
}

console.log(`Connecting to database at: ${dbUrl}`);

const server = Bun.serve({
  port: process.env.PORT,
  routes: {
    "/": index,
    "/login": {
      POST: withValidation(LoginSchema, loginUser),
    },
    "/register": {
      POST: withValidation(UserSchema, registerUser),
    },
    "/logout": {
      POST: withAuth(logout),
    },
    "/refresh": {
      POST: withValidation(RefreshSchema, refreshAccessToken),
    },
    "/tag/:id": {
      PATCH: withAuth(
        withParams(IdParamSchema, withValidation(TagSchema, updateTag)),
      ),
      DELETE: withAuth(withParams(IdParamSchema, deleteTag)),
    },
    "/tags": {
      POST: withAuth(withValidation(TagSchema, createTag)),
      GET: withAuth(getAllTags),
    },
    "/category/:id": {
      PATCH: withAuth(
        withParams(
          IdParamSchema,
          withValidation(CategorySchema, updateCategory),
        ),
      ),
      DELETE: withAuth(withParams(IdParamSchema, deleteCategory)),
    },
    "/categories": {
      POST: withAuth(withValidation(CategorySchema, createCategory)),
      GET: withAuth(getAllCategory),
    },
    "/create": {
      POST: withAuth(async () => new Response("Create a new blog post")),
    },
    "/update": {
      PUT: withAuth(async () => new Response("Update an existing blog post")),
    },
    "/delete": {
      DELETE: withAuth(
        async () => new Response("Delete an existing blog post"),
      ),
    },
    "/post": {
      GET: withAuth(async () => new Response("Get a single blog post")),
    },
    "/posts": {
      GET: withAuth(async () => new Response("Get all blog posts")),
    },
    "/filter": {
      GET: withAuth(
        async () => new Response("Filter blog posts by a search term"),
      ),
    },
  },
  error(error) {
    return globalErrorHandler(error);
  },
});

console.log(`Listening on ${server.url}`);
