// tasks.ts
import { relations } from 'drizzle-orm';
import { integer, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';

import { categories } from './categories';
import { masterTaskPriorityLevels } from './master_task_priority_levels';
import { masterTaskSizes } from './master_task_sizes';
import { taskSessions } from './task_sessions';

export const tasks = pgTable('tasks', {
  id: integer('id').primaryKey(),
  createdAt: timestamp('created_at', { mode: 'date' }).notNull().defaultNow(),
  name: varchar('name', { length: 255 }).notNull(),
  description: varchar('description', { length: 255 }).notNull(),
  deadline: timestamp('deadline', { mode: 'date' }).notNull(),
  completedPercentage: integer('completed_percentage').notNull(),
  userId: integer('user_id').notNull(),
  sizeId: integer('size_id').notNull(),
  priorityLevelsId: integer('importance_level_id').notNull(),
});

export const tasksRelations = relations(tasks, ({ one, many }) => ({
  priorityLevel: one(masterTaskPriorityLevels, {
    fields: [tasks.priorityLevelsId],
    references: [masterTaskPriorityLevels.id],
  }),
  size: one(masterTaskSizes, {
    fields: [tasks.sizeId],
    references: [masterTaskSizes.id],
  }),
  taskSessions: many(taskSessions),
  categories: many(categories),
}));
