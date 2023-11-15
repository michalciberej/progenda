import prisma from '@/app/lib/prismadb';
import getUser from '@/app/actions/getUser';
import { TaskData } from '@/typings';
import { NextResponse } from 'next/server';
import { pusherServer } from '@/app/lib/pusher';

export async function POST(request: Request) {
  const user = await getUser();
  const formData: TaskData = await request.json();
  const { title, body, date, list } = formData;

  if (!title) {
    return new NextResponse('Invalid data', { status: 400 });
  }

  if (!user?.id || !user.email) {
    return new NextResponse('Unauthorized', { status: 400 });
  }

  const task = await prisma.task.create({
    data: {
      title,
      body,
      date,
      user: {
        connect: {
          id: user.id,
        },
      },
      list: {
        connect: {
          id: list,
        },
      },
    },
    include: {
      list: true,
    },
  });

  await pusherServer.trigger('new-task', 'task:new', task);

  return NextResponse.json(task);
}
