import { Task } from '@prisma/client';
import { Variant } from '@/typings';
import getCurrentDate from './getCurrentDate';

const filterTasks = (tasks: Task[], variant: Variant) => {
  const { today } = getCurrentDate();

  if (variant === 'today') {
    return tasks.filter((task) => task.date === today);
  }

  return [];
};

export default filterTasks;
