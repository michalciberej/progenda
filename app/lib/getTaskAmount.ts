import { Task } from '@prisma/client';
import getCurrentDate from './getCurrentDate';
import { Variant } from '@/typings';

const getTaskAmount = (tasks: Task[], variant: Variant) => {
  if (variant === 'upcoming') {
    return tasks.length;
  }

  if (variant === 'today') {
    const { today } = getCurrentDate();
    return tasks.reduce((acc, cur) => {
      if (cur.date === today) return acc + 1;
      else return acc + 0;
    }, 0);
  }
};

export default getTaskAmount;
