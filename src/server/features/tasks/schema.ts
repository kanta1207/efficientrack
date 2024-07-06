import { tasks } from '@/db/schema';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

export const insertTaskSchema = createInsertSchema(tasks);
export const updateTaskSchema = z.object({
  attr: insertTaskSchema.partial().omit({ id: true, userId: true }),
  id: z.number(),
});
