import { Hono } from 'hono'
import routes from './routes';
import { cors } from 'hono/cors';

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

app.use(cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT'],
  allowHeaders: ['Content-Type', 'Authorization']
}));
app.route("/", routes);

export default app
