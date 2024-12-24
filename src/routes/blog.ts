import { Hono } from "hono";
import * as blogController from "../controllers/blog";
import { auth } from "../middlewares/auth";

const blogRoutes = new Hono().basePath("/blog");

// blogRoutes.use("/*", auth());

blogRoutes.get("/all", blogController.getAllBlogs);
blogRoutes.get("/:id", auth(), blogController.getBlogById);
blogRoutes.post("/create", auth(), blogController.createBlog);
blogRoutes.put("/:id", auth(), blogController.editBlog);

export { blogRoutes };