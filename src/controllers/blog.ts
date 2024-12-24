import { Context } from "hono";
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { createBlogInput, updateBlogInput } from "@developerkeshavkumar/blog-common";

export const getAllBlogs = async (c: Context) => {
   try {
      const prisma = new PrismaClient({
         datasourceUrl: c.env?.DATABASE_URL,
      }).$extends(withAccelerate());

      const blogs = await prisma.blog.findMany({});

      return c.json({ blogs }, 200);
   } catch (error) {
      return c.json({ error: "Can't fetch all blogs right now, Try again later" }, 500);
   }
}

export const getBlogById = async (c: Context) => {
   try {
      const prisma = new PrismaClient({
         datasourceUrl: c.env?.DATABASE_URL,
      }).$extends(withAccelerate());

      const blog = await prisma.blog.findUnique({
         where: {
            id: c.req.param('id')
         }
      });

      if (!blog) {
         return c.json({ error: "Invalid blog id" }, 404);
      }

      return c.json({ blog }, 200);
   } catch (error) {
      return c.json({ error: "Can't fetch this blog right now, Try again later" }, 500);
   }
}

export const createBlog = async (c: Context) => {
   try {
      const body = await c.req.json();
      const parseResult = createBlogInput.safeParse(body);

      if (!parseResult.success) {
         return c.json({ error: "Title and content is required" }, 411);
      }

      const { title, content } = body;

      const prisma = new PrismaClient({
         datasourceUrl: c.env?.DATABASE_URL,
      }).$extends(withAccelerate());

      const blog = await prisma.blog.create({
         data: {
            title,
            content,
            authorId: c.get('userId')
         }
      })

      return c.json({ id: blog?.id }, 200);
   } catch (error: any) {
      return c.json({
         error: "Error while creating blog"
      }, 500);
   }
}

export const editBlog = async (c: Context) => {
   try {
      const body = await c.req.json();
      const parseResult = updateBlogInput.safeParse(body);

      if (!parseResult.success) {
         return c.json({ error: "Title and content is required" }, 411);
      }

      const prisma = new PrismaClient({
         datasourceUrl: c.env?.DATABASE_URL,
      }).$extends(withAccelerate());

      const blog = await prisma.blog.update({
         where: {
            id: c.req.param('id'),
            authorId: c.get('userId')
         },
         data: {
            title: body?.title,
            content: body?.content,
            authorId: c.get('userId')
         }
      })

      return c.json({ id: blog?.id }, 200);
   } catch (error: any) {
      return c.json({
         error: "Error while editing blog"
      }, 500);
   }
} 