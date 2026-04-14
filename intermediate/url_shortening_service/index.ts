import Bun from "bun";
import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { withValidation } from "./src/middlewares/validation";
import { UrlSchema } from "./src/types/url";
import {
  redirectShortenUrl,
  shortenUrl,
} from "./src/controllers/shortenController";
import { withParams } from "./src/middlewares/paramsValidation";

export const drizzleDBClient = drizzle(process.env.DATABASE_URL!);

await migrate(drizzleDBClient, { migrationsFolder: "./drizzle" });

const server = Bun.serve({
  port: 3000,
  routes: {
    "/shorten": {
      POST: withValidation(UrlSchema, shortenUrl),
    },
    "/go/:url": {
      GET: withParams(UrlSchema, redirectShortenUrl),
    },
    "/shorten/:shortcode": {
      GET: () => Response.json({}),
      PUT: () => Response.json({}),
      DELETE: () => Response.json({}),
    },
    "/shorten/:shortcode/stats": {
      GET: () => Response.json({}),
    },
  },
});

console.log(`Server running on port ${server.port}`);
