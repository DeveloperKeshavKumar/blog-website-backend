import { Context, Next } from "hono";
import { verify } from "hono/jwt";


export function auth() {
   return async (c: Context, next: Next) => {
      const authHeader = c.req.header('Authorization');

      if (!authHeader || !authHeader.startsWith('Bearer ')) {
         return c.json({ error: 'Missing or invalid Authorization header' }, 401);
      }

      const token = authHeader.replace('Bearer ', '');

      try {
         const decodedPayload = await verify(token, c.env?.JWT_SECRET);
         c.set('userId', decodedPayload?.id);
         await next();
      } catch (error) {
         return c.json({ error: 'Invalid token' }, 401);
      }
   }
}

