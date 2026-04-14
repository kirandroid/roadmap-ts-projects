import Bun from "bun";
import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { withValidation } from "./src/middlewares/validation";
import {
  deleteShortenUrl,
  getShortenUrl,
  getShortenUrlStats,
  redirectShortenUrl,
  shortenUrl,
  updateShortenData,
} from "./src/controllers/shortenController";
import { withParams } from "./src/middlewares/paramsValidation";
import { UpdateUrlSchema, UrlParamSchema } from "./src/types/url";

export const drizzleDBClient = drizzle(process.env.DATABASE_URL!);

await migrate(drizzleDBClient, { migrationsFolder: "./drizzle" });

const server = Bun.serve({
  port: 3000,
  routes: {
    "/shorten": {
      POST: withValidation(UpdateUrlSchema, shortenUrl),
    },
    "/go/:slug": {
      GET: withParams(UrlParamSchema, redirectShortenUrl),
    },
    "/shorten/:slug": {
      GET: withParams(UrlParamSchema, getShortenUrl),
      PUT: withParams(
        UrlParamSchema,
        withValidation(UpdateUrlSchema, updateShortenData),
      ),
      DELETE: withParams(UrlParamSchema, deleteShortenUrl),
    },
    "/shorten/:slug/stats": {
      GET: withParams(UrlParamSchema, getShortenUrlStats),
    },
  },
});

console.log(`Server running on port ${server.port}`);
