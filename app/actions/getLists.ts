import prisma from '@/app/lib/prismadb';
import getUser from './getUser';

const getLists = async () => {
  const user = await getUser();

  if (!user?.id) {
    return [];
  }

  try {
    const lists = await prisma.list.findMany({
      where: {
        user: {
          is: {
            id: user.id,
          },
        },
      },
      include: {
        _count: {
          select: {
            task: true,
          },
        },
      },
    });

    return lists;
  } catch (error: any) {
    return [];
  }
};

export default getLists;
