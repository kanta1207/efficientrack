import { relations } from 'drizzle-orm';
import { integer, pgTable, timestamp } from 'drizzle-orm/pg-core';

import { locations } from './locations';
import { tasks } from './tasks';
import { users } from './users';

export const taskSessions = pgTable('task_sessions', {
  id: integer('id').primaryKey(),
  createdAt: timestamp('created_at', { mode: 'date' }).notNull().defaultNow(),
  startedAt: timestamp('started_at', { mode: 'date' }).notNull(),
  endedAt: timestamp('ended_at', { mode: 'date' }),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  taskId: integer('task_id').notNull(),
  locationId: integer('location_id'),
});

export const taskSessionsRelations = relations(taskSessions, ({ one }) => ({
  task: one(tasks, {
    fields: [taskSessions.taskId],
    references: [tasks.id],
  }),
  location: one(locations, {
    fields: [taskSessions.locationId],
    references: [locations.id],
  }),
}));
