import prisma from '@/app/lib/prismadb';
import getSession from './getSession';

const getUser = async () => {
  const session = await getSession();

  if (!session?.user?.email) {
    return null;
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });
    return user;
  } catch (error: any) {
    return null;
  }
};

export default getUser
