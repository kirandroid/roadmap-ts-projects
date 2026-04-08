import { registerUser } from "./src/controllers/authControllers";
import { withValidation } from "./src/middlewares/validation";
import { UserSchema } from "./src/types/user";
import type { BunRequest } from "bun";
import index from "./src/views/index.html";

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
      POST: async (req) => {
        const body = await req.json();
        return Response.json(body);
      },
    },
    "/register": {
      POST: withValidation(UserSchema, registerUser),
    },
    "/create": () => new Response("Create a new blog post"),
    "/update": () => new Response("Update an existing blog post"),
    "/delete": () => new Response("Delete an existing blog post"),
    "/post": () => new Response("Get a single blog post"),
    "/posts": () => new Response("Get all blog posts"),
    "/filter": () => new Response("Filter blog posts by a search term"),
  },
});

console.log(`Listening on ${server.url}`);
