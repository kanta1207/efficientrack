import { integer, pgTable } from 'drizzle-orm/pg-core';

import { categories } from './categories';
import { tasks } from './tasks';

export const tasksToCategories = pgTable('tasks_to_categories', {
  taskId: integer('task_id')
    .notNull()
    .references(() => tasks.id, { onDelete: 'cascade' }),
  categoryId: integer('category_id')
    .notNull()
    .references(() => categories.id, { onDelete: 'cascade' }),
});
