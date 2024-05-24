import { relations } from 'drizzle-orm';
import { integer, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';

import { taskSessions } from './task_sessions';

export const locations = pgTable('locations', {
  id: integer('id').primaryKey(),
  createdAt: timestamp('created_at', { mode: 'date' }).notNull().defaultNow(),
  name: varchar('name', { length: 255 }).notNull(),
  userId: integer('user_id').notNull(),
});

export const locationsRelations = relations(locations, ({ many }) => ({
  taskSessions: many(taskSessions),
}));
