import { Context } from "hono";
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { sign } from "hono/jwt";

export const signUp = async (c: Context) => {
   const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL,
   }).$extends(withAccelerate());
   try {
      const {email, name, password} = await c.req.json();
      const user = await prisma.user.create({
         data: {
            email,
            name,
            password
         }
      });
      const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
      return c.json({ jwt },200);
   } catch (error: any) {
      return c.json({ error: "Can't Signup, Try again later" }, 500);
   }
}

export const signIn = async (c: Context) => {
   const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL,
   }).$extends(withAccelerate());
   try {
      const {email, password} = await c.req.json();
      const user = await prisma.user.findUnique({
         where: {
            email,
            password
         }
      });
      
      if (!user) {
         return c.json({ error: "Cannot signin try a valid email or password" }, 403);
      }
      const jwt = await sign({ id: user?.id }, c.env.JWT_SECRET);
      return c.json({ jwt },200);
   } catch (error: any) {
      return c.json({ error: (error as Error).message }, 500);
   }
}