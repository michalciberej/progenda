import prisma from '@/app/lib/prismadb';
import getUser from './getUser';

const getTasks = async () => {
  const user = await getUser();

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
      },
    });

    return tasks;
  } catch (error: any) {
    return [];
  }
};

export default getTasks;
