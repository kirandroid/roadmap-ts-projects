import { UnitController } from "./src/controllers/unit_controllers";
import type { BunRequest } from "bun";

const unitController = new UnitController();

const server = Bun.serve({
  port: 3000,
  routes: {
    "/": () => new Response("Biu"),
    "/api/length": {
      POST: async (req) => unitController.lengthConverter(req),
    },
    "/api/weight": {
      POST: async (req) => unitController.weightConverter(req),
    },
    "/api/temperature": {
      POST: async (req) => unitController.tempConverter(req),
    },
  },
});

console.log(`Listening on ${server.url}`);
