import { zValidator } from '@hono/zod-validator';
import { createId } from '@paralleldrive/cuid2';
import { Hono } from 'hono';
import { z } from 'zod';

import db from '@/db/drizzle';
import { tasks } from '@/db/schema';

export const schema = z.object({
  text: z.string().min(1, 'Please write something.'),
});

const app = new Hono().get('/', async (c) => {
  const task = 
})

export default app;
