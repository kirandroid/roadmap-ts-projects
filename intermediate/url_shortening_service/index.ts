import Bun from "bun";

Bun.serve({
  port: 3000,
  routes: {
    "/blog": () => Response.redirect("https://google.com"),
  },
});
