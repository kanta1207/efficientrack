import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';

import { db } from '@/db';
import { taskRepository } from '@/db/repositories/task.repository';
import { insertTaskSchema } from '@/db/schema';

const app = new Hono();

export const taskRoute = app.post('/tasks', zValidator('json', insertTaskSchema), async (c) => {
  const body = await c.req.valid('json');
  await taskRepository.createTask(db, body);
});
