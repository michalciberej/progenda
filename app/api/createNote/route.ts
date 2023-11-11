import prisma from '@/app/lib/prismadb';
import getUser from '@/app/actions/getUser';
import { NextResponse } from 'next/server';
import { NoteData } from '@/typings';

export async function POST(request: Request) {
  const user = await getUser();
  const noteData: NoteData = await request.json();
  const { title, body, color } = noteData;

  if (!title) {
    return new NextResponse('Invalid data', { status: 400 });
  }

  if (!user?.id || !user.email) {
    return new NextResponse('Unauthorized', { status: 400 });
  }

  const task = await prisma.note.create({
    data: {
      title,
      body,
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
