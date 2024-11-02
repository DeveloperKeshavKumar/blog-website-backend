import { Context, Hono } from "hono";
import * as authController from "../controllers/auth";

const authRoutes = new Hono().basePath("/user");

authRoutes.post("/signup", authController.signUp);
authRoutes.post("/signin", authController.signIn);

export { authRoutes };