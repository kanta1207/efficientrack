import { Hono } from 'hono';
import { handle } from 'hono/vercel';

import { taskRoutes } from '@/server/features/tasks/routes';

export const runtime = 'edge';

const app = new Hono().basePath('/api').get('/hello', async (c) => {
  return c.json({ name: 'John Doe' });
});
const appRoutes = app.route('/tasks', taskRoutes);

export type ApiType = typeof appRoutes;

export const GET = handle(appRoutes);
export const POST = handle(appRoutes);
