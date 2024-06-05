import { relations } from 'drizzle-orm';
import { integer, pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';

import { categories, masterTaskPriorityLevels, masterTaskSizes, taskSessions, users } from './';

export const tasks = pgTable('tasks', {
  id: integer('id').primaryKey(),
  createdAt: timestamp('created_at', { mode: 'date' }).notNull().defaultNow(),
  name: varchar('name', { length: 255 }).notNull(),
  description: varchar('description', { length: 255 }).notNull(),
  deadline: timestamp('deadline', { mode: 'date' }).notNull(),
  completedPercentage: integer('completed_percentage').notNull(),
  userId: text('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  sizeId: integer('size_id').notNull(),
  priorityLevelsId: integer('importance_level_id').notNull(),
});

export const tasksRelations = relations(tasks, ({ one, many }) => ({
  user: one(users, {
    fields: [tasks.userId],
    references: [users.id],
  }),
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

export type Task = typeof tasks.$inferSelect & typeof tasksRelations.table.$inferSelect;
export type InsertTask = typeof tasks.$inferInsert;
export type UpdateTask = Partial<InsertTask>;

export const insertTaskSchema = createInsertSchema(tasks);
export const updateTaskSchema = insertTaskSchema.partial().omit({ id: true, userId: true });
