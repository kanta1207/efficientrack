import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';

import { db } from '@/db';
import { taskRepository } from '@/db/repositories/task.repository';
import { insertTaskSchema, updateTaskSchema } from '@/db/schema';

const app = new Hono();

export const taskRoutes = app
  .post('/tasks', zValidator('json', insertTaskSchema), async (c) => {
    const body = await c.req.valid('json');
    await taskRepository.createTask(db, body);
  })
  .get('/tasks/:taskId', async (c) => {
    const taskId = c.req.param('taskId');
    const task = await taskRepository.findById(db, parseInt(taskId));
    return c.json(task);
  })
  .get('/tasks/:userId', async (c) => {
    const userId = c.req.param('userId');
    const tasks = await taskRepository.findByUserId(db, userId);
    return c.json(tasks);
  })
  .patch('/tasks/:taskId', zValidator('json', updateTaskSchema), async (c) => {
    const taskId = c.req.param('taskId');
    const body = await c.req.valid('json');
    await taskRepository.updateTask(db, parseInt(taskId), body);
  })
  .delete('/tasks/:taskId', async (c) => {
    const taskId = c.req.param('taskId');
    await taskRepository.deleteTask(db, parseInt(taskId));
  });
