import { relations } from 'drizzle-orm';
import { integer, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';

import { tasks } from './tasks';

export const masterTaskPriorityLevels = pgTable('master_task_priority_levels', {
  id: integer('id').primaryKey(),
  createdAt: timestamp('created_at', { mode: 'date' }).notNull().defaultNow(),
  name: varchar('name', { length: 255 }).notNull(),
  description: varchar('description', { length: 255 }).notNull(),
});

export const masterTaskPriorityLevelsRelations = relations(
  masterTaskPriorityLevels,
  ({ many }) => ({
    tasks: many(tasks),
  })
);
