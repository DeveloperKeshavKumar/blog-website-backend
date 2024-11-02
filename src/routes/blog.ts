import { Hono } from "hono";
import * as blogController from "../controllers/blog";
import { auth } from "../middlewares/auth";

const blogRoutes = new Hono().basePath("/blog");

blogRoutes.use("/*", auth());

blogRoutes.get("/all", blogController.getAllBlogs);
blogRoutes.get("/:id", blogController.getBlogById);
blogRoutes.post("/create", blogController.createBlog);
blogRoutes.put("/:id", blogController.editBlog);

export { blogRoutes };