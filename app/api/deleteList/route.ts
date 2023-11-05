import prisma from '@/app/lib/prismadb';
import getUser from '@/app/actions/getUser';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const user = await getUser();
  const listId: string = await request.text();

  if (!listId) {
    return new NextResponse('Invalid data', { status: 400 });
  }

  if (!user?.id || !user.email) {
    return new NextResponse('Unauthorized', { status: 400 });
  }

  const list = await prisma.list.delete({
    where: {
      user: {
        is: {
          id: user.id,
        },
      },
      id: listId,
    },
  });

  return NextResponse.json(list);
}
