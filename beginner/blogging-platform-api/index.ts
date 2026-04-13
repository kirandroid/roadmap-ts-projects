import index from "./src/views/index.html";
import { globalErrorHandler } from "./src/middlewares/globalErrorHandler";
import { tagRoutes } from "./src/routes/tagRoutes";
import { categoryRoutes } from "./src/routes/categoryRoutes";
import { authRoutes } from "./src/routes/authRoutes";
import type { BunRequest } from "bun";
import { postRoutes } from "./src/routes/postRoutes";
import { prefixRoutes } from "./src/utils/prefixRoutes";

const dbUrl = process.env.DATABASE_URL;
const API_PREFIX = "/api/v1";

if (!dbUrl) {
  console.error("DATABASE_URL is not defined in .env");
  process.exit(1);
}

console.log(`Connecting to database at: ${dbUrl}`);

const server = Bun.serve({
  port: process.env.PORT,
  routes: {
    "/": index,
    ...prefixRoutes(API_PREFIX, authRoutes),
    ...prefixRoutes(API_PREFIX, tagRoutes),
    ...prefixRoutes(API_PREFIX, categoryRoutes),
    ...prefixRoutes(API_PREFIX, postRoutes),
  },
  error(error) {
    return globalErrorHandler(error);
  },
});

console.log(`Listening on ${server.url}`);
