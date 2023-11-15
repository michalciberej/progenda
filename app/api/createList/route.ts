import prisma from '@/app/lib/prismadb';
import getUser from '@/app/actions/getUser';
import { ListData } from '@/typings';
import { NextResponse } from 'next/server';
import { pusherServer } from '@/app/lib/pusher';

export async function POST(request: Request) {
  const user = await getUser();
  const listData: ListData = await request.json();
  const { title, color } = listData;

  if (!title) {
    return new NextResponse('Invalid data', { status: 400 });
  }

  if (!user?.id || !user.email) {
    return new NextResponse('Unauthorized', { status: 400 });
  }

  const list = await prisma.list.create({
    data: {
      title,
      color,
      user: {
        connect: {
          id: user.id,
        },
      },
    },
    include: {
      _count: true,
    },
  });

  await pusherServer.trigger('new-list', 'list:new', list);

  return NextResponse.json(list);
}
