import { Context, Hono } from "hono";
import { authRoutes } from "./auth";
import { blogRoutes } from "./blog";

const routes = new Hono();

routes.route("/api/v1", authRoutes);
routes.route("/api/v1", blogRoutes);
routes.get('/', (c: Context) => {
   return c.text('Server is up and running!');
})

export default routes;