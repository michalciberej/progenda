import prisma from '@/app/lib/prismadb';
import getUser from '@/app/actions/getUser';
import { NextResponse } from 'next/server';
import { Task } from '@prisma/client';
import { pusherServer } from '@/app/lib/pusher';

export async function POST(request: Request) {
  const user = await getUser();
  const taskData: Task = await request.json();

  if (!taskData) {
    return new NextResponse('Invalid data', { status: 400 });
  }

  if (!user?.id || !user.email) {
    return new NextResponse('Unauthorized', { status: 400 });
  }

  const task = await prisma.task.delete({
    where: {
      id: taskData.id,
      user: {
        is: {
          id: user.id,
        },
      },
    },
  });

  pusherServer.trigger('delete-task', 'task:delete', task);

  return NextResponse.json(task);
}
