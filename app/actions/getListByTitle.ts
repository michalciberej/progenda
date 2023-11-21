import prisma from '@/app/lib/prismadb';
import getUser from './getUser';

const getListsByTitle = async (listTitle: string) => {
  const user = await getUser();

  if (!user?.id) {
    return null;
  }

  try {
    const list = await prisma.list.findUnique({
      where: {
        user: {
          is: {
            id: user.id,
          },
        },
        title: listTitle,
      },
      include: {
        _count: {
          select: {
            task: true,
          },
        },
        task: true,
      },
    });

    return list;
  } catch (error: any) {
    return null;
  }
};

export default getListsByTitle;
