import prisma from '@/app/lib/prismadb';
import getUser from './getUser';
import getCurrentDate from '../lib/getCurrentDate';

const getTomorrowTasks = async () => {
  const user = await getUser();
  const { tomorrow } = getCurrentDate();

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
          equals: tomorrow,
        },
      },
    });

    return tasks;
  } catch (error: any) {
    return [];
  }
};

export default getTomorrowTasks;
