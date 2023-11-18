import prisma from '@/app/lib/prismadb';
import getUser from '@/app/actions/getUser';
import { NextResponse } from 'next/server';
import { pusherServer } from '@/app/lib/pusher';
import { User } from '@prisma/client';

export async function POST(request: Request) {
  const user = await getUser();
  const userData: User = await request.json();
  const { name, image } = userData;

  if (!user?.id || !user.email) {
    return new NextResponse('Unauthorized', { status: 400 });
  }

  const updatedUser = await prisma.user.update({
    where: {
      email: user.email,
    },
    data: {
      name,
      image,
    },
  });

  await pusherServer.trigger('update-user', 'user:update', updatedUser);

  return NextResponse.json(updatedUser);
}
