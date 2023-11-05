import prisma from '@/app/lib/prismadb';
import getUser from '@/app/actions/getUser';
import { ListData } from '@/typings';
import { NextResponse } from 'next/server';

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

  const task = await prisma.list.create({
    data: {
      title,
      color,
      user: {
        connect: {
          id: user.id,
        },
      },
    },
  });

  return NextResponse.json(task);
}
