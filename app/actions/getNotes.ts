import prisma from '@/app/lib/prismadb';
import getUser from './getUser';

const getNotes = async () => {
  const user = await getUser();

  if (!user?.id) {
    return [];
  }

  try {
    const notes = await prisma.note.findMany({
      where: {
        user: {
          is: {
            id: user.id,
          },
        },
      },
    });

    return notes;
  } catch (error: any) {
    return [];
  }
};

export default getNotes;
