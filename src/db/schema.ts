import { relations } from 'drizzle-orm';
import { integer, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';

// Tasks schema & relations
export const tasks = pgTable('tasks', {
  id: integer('id').primaryKey(),
  createdAt: timestamp('created_at', { mode: 'date' }).notNull().defaultNow(),
  name: varchar('name', { length: 255 }).notNull(),
  description: varchar('description', { length: 255 }).notNull(),
  deadline: timestamp('deadline', { mode: 'date' }).notNull(),
  completedPercentage: integer('completed_percentage').notNull(),
  userId: integer('user_id').notNull(),
  importanceLevelId: integer('importance_level_id').notNull(),
});

export const tasksRelations = relations(tasks, ({ one, many }) => ({
  importanceLevel: one(masterImportanceLevels, {
    fields: [tasks.importanceLevelId],
    references: [masterImportanceLevels.id],
  }),
  taskSessions: many(taskSessions),
  categories: many(categories),
}));

// TaskSessions schema & relations
export const taskSessions = pgTable('task_sessions', {
  id: integer('id').primaryKey(),
  createdAt: timestamp('created_at', { mode: 'date' }).notNull().defaultNow(),
  startedAt: timestamp('started_at', { mode: 'date' }).notNull(),
  endedAt: timestamp('ended_at', { mode: 'date' }),
  userId: integer('user_id').notNull(),
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

// Categories schema & relations
export const categories = pgTable('categories', {
  id: integer('id').primaryKey(),
  createdAt: timestamp('created_at', { mode: 'date' }).notNull().defaultNow(),
  name: varchar('name', { length: 255 }).notNull(),
  userId: integer('user_id').notNull(),
});

export const categoriesRelations = relations(categories, ({ many }) => ({
  tasks: many(tasks),
}));

// Locations schema & relations
export const locations = pgTable('locations', {
  id: integer('id').primaryKey(),
  createdAt: timestamp('created_at', { mode: 'date' }).notNull().defaultNow(),
  name: varchar('name', { length: 255 }).notNull(),
  userId: integer('user_id').notNull(),
});

export const locationsRelations = relations(locations, ({ many }) => ({
  taskSessions: many(taskSessions),
}));

// MasterSizes schema & relations
export const masterSizes = pgTable('master_sizes', {
  id: integer('id').primaryKey(),
  createdAt: timestamp('created_at', { mode: 'date' }).notNull().defaultNow(),
  name: varchar('name', { length: 255 }).notNull(),
});

export const masterSizesRelations = relations(masterSizes, ({ many }) => ({
  tasks: many(tasks),
}));

// MasterImportanceLevels schema & relations
export const masterImportanceLevels = pgTable('master_importance_level', {
  id: integer('id').primaryKey(),
  createdAt: timestamp('created_at', { mode: 'date' }).notNull().defaultNow(),
  name: varchar('name', { length: 255 }).notNull(),
  description: varchar('description', { length: 255 }).notNull(),
});

export const masterImportanceLevelsRelations = relations(masterImportanceLevels, ({ many }) => ({
  tasks: many(tasks),
}));
