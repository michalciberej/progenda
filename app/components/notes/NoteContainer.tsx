'use client';

import { Note } from '@prisma/client';
import NoteCard from './NoteCard';
import NoteForm from './NoteForm';
import { useEffect, useState } from 'react';
import { pusherClient } from '@/app/lib/pusher';

const NoteContainer = ({ notes }: { notes: Note[] }) => {
  const [allNotes, setAllNotes] = useState<Note[]>(notes);

  useEffect(() => {
    pusherClient.subscribe('new-note');

    const noteHandler = (note: Note) => {
      setAllNotes(allNotes.concat(note));
    };

    pusherClient.bind('note:new', noteHandler);

    return () => {
      pusherClient.unsubscribe('new-note');
      pusherClient.unbind('note:new', noteHandler);
    };
  }, [allNotes]);

  useEffect(() => {
    pusherClient.subscribe('delete-note');

    const noteHandler = (oldNote: Note) => {
      setAllNotes(allNotes.filter((note) => note.id !== oldNote.id));
    };

    pusherClient.bind('note:delete', noteHandler);

    return () => {
      pusherClient.unsubscribe('delete-note');
      pusherClient.unbind('note:delete', noteHandler);
    };
  }, [allNotes]);

  return (
    <ul className='h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:grid-rows-2 gap-4 rounded-xl'>
      {allNotes.map((note, index) => (
        <NoteCard
          key={index}
          note={note}
        />
      ))}
      {notes.length < 8 && <NoteForm />}
    </ul>
  );
};

export default NoteContainer;
