import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';

import { db } from '@/db';
import { taskRepository } from '@/db/repositories/task.repository';
import { insertTaskSchema, updateTaskSchema } from './schema';

const app = new Hono();

export const taskRoutes = app
  .post('/', zValidator('json', insertTaskSchema), async (c) => {
    const body = await c.req.valid('json');
    await taskRepository.createTask(db, body);
  })
  .get('/', async (c) => {
    // TODO: Implement auth middleware and get actual userId
    const userId = 'userId';
    const tasks = await taskRepository.findByUserId(db, userId);
    return c.json({ tasks });
  })
  .get('/:id', async (c) => {
    const taskId = c.req.param('id');
    const task = await taskRepository.findById(db, parseInt(taskId));
    return c.json(task);
  })
  .patch('/:id', zValidator('json', updateTaskSchema), async (c) => {
    const body = await c.req.valid('json');
    const { id, attr } = body;
    await taskRepository.updateTask(db, id, attr);
  })
  .delete('/:id', async (c) => {
    const taskId = c.req.param('id');
    await taskRepository.deleteTask(db, parseInt(taskId));
  });
