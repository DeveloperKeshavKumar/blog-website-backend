import { Context, Hono } from 'hono'
import routes from './routes';

type UUID = string;

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string,
  },
  Variables: {
    userId: UUID
  }
}>();

app.route("/", routes);

export default app
