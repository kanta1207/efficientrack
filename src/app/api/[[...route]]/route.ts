import { Hono } from 'hono';
import { handle } from 'hono/vercel';

import { taskRoutes } from './(tasks)/tasks.routes';

export const runtime = 'edge';

const app = new Hono().basePath('/api');
app.route('/tasks', taskRoutes);

export type AppType = typeof app;

export const GET = handle(app);
export const POST = handle(app);
