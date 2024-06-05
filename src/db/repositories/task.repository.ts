import { eq } from 'drizzle-orm';

import { DatabaseContext } from '../';
import {
  categories,
  InsertTask,
  masterTaskPriorityLevels,
  masterTaskSizes,
  tasks,
} from '../schema';
import { UpdateTask } from '../schema/tasks';

export const taskRepository = {
  async createTask(db: DatabaseContext, task: InsertTask) {
    await db.insert(tasks).values(task);
  },
  async findById(db: DatabaseContext, id: number) {
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
      .where(eq(tasks.id, id));
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
  async updateTask(db: DatabaseContext, id: number, attr: UpdateTask) {
    await db.update(tasks).set(attr).where(eq(tasks.id, id));
  },
  async deleteTask(db: DatabaseContext, id: number) {
    await db.delete(tasks).where(eq(tasks.id, id));
  },
};
