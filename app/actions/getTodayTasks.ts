import prisma from '@/app/lib/prismadb';
import getUser from './getUser';
import getCurrentDate from '../lib/getCurrentDate';

const getTodayTasks = async () => {
  const user = await getUser();
  const { today } = getCurrentDate();

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
          equals: today,
        },
      },
      include: { list: true },
    });

    return tasks;
  } catch (error: any) {
    return [];
  }
};

export default getTodayTasks;
