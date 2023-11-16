import prisma from '@/app/lib/prismadb';
import getUser from '@/app/actions/getUser';
import { TaskData } from '@/typings';
import { NextResponse } from 'next/server';
import { pusherServer } from '@/app/lib/pusher';

export async function POST(request: Request) {
  const user = await getUser();
  const formData: TaskData = await request.json();
  const { title, body, date, id, list } = formData;

  if (!title) {
    return new NextResponse('Invalid data', { status: 400 });
  }

  if (!user?.id || !user.email) {
    return new NextResponse('Unauthorized', { status: 400 });
  }

  const task = await prisma.task.update({
    where: {
      id: id,
      user: {
        is: {
          id: user.id,
        },
      },
    },
    data: {
      title,
      body,
      date,
      updatedAt: new Date().toISOString(),
      listId: list,
    },
  });

  await pusherServer.trigger('update:task', 'task:update', task);

  return NextResponse.json(task);
}
