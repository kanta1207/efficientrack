import { relations } from 'drizzle-orm';
import { integer, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';

import { tasks } from './tasks';

export const masterTaskSizes = pgTable('master_task_sizes', {
  id: integer('id').primaryKey(),
  createdAt: timestamp('created_at', { mode: 'date' }).notNull().defaultNow(),
  name: varchar('name', { length: 255 }).notNull(),
});

export const masterSizesRelations = relations(masterTaskSizes, ({ many }) => ({
  tasks: many(tasks),
}));
