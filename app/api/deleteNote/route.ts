import prisma from '@/app/lib/prismadb';
import getUser from '@/app/actions/getUser';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const user = await getUser();
  const noteId: string = await request.text();

  if (!noteId) {
    return new NextResponse('Invalid data', { status: 400 });
  }

  if (!user?.id || !user.email) {
    return new NextResponse('Unauthorized', { status: 400 });
  }

  const list = await prisma.note.delete({
    where: {
      user: {
        is: {
          id: user.id,
        },
      },
      id: noteId,
    },
  });

  return NextResponse.json(list);
}
