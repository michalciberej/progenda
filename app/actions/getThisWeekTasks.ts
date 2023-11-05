import prisma from '@/app/lib/prismadb';
import getUser from './getUser';
import getCurrentDate from '../lib/getCurrentDate';

const getThisWeekTasks = async () => {
  const user = await getUser();
  const { today, todayNextWeek } = getCurrentDate();

  if (!user?.id) {
    return [];
  }

  try {
    const tasks = await prisma.task.findMany({
      orderBy: {
        createdAt: 'asc',
      },
      where: {
        user: {
          is: {
            id: user.id,
          },
        },
        date: {
          lte: todayNextWeek,
          gte: today,
        },
      },
      include: { list: true },
    });

    return tasks;
  } catch (error: any) {
    return [];
  }
};

export default getThisWeekTasks;
