import { eq } from 'drizzle-orm';

import { DatabaseContext } from '../';
import {
  categories,
  InsertTask,
  masterTaskPriorityLevels,
  masterTaskSizes,
  tasks,
} from '../schema';

export const taskRepository = {
  async createTask(db: DatabaseContext, task: InsertTask) {
    await db.insert(tasks).values(task);
  },

  async findByUserId(db: DatabaseContext, userId: string) {
    return db
      .select({
        id: tasks.id,
        createdAt: tasks.createdAt,
        name: tasks.name,
        description: tasks.description,
        deadline: tasks.deadline,
        completedPercentage: tasks.completedPercentage,
        userId: tasks.userId,
        size: {
          id: masterTaskSizes.id,
          name: masterTaskSizes.name,
        },
        priorityLevel: {
          id: masterTaskPriorityLevels.id,
          name: masterTaskPriorityLevels.name,
        },
        categories: {
          id: categories.id,
          name: categories.name,
        },
      })
      .from(tasks)
      .leftJoin(masterTaskSizes, eq(tasks.sizeId, masterTaskSizes.id))
      .leftJoin(masterTaskPriorityLevels, eq(tasks.priorityLevelsId, masterTaskPriorityLevels.id))
      .where(eq(tasks.userId, userId));
  },
};
