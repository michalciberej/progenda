'use client';

import { Note } from '@prisma/client';
import axios from 'axios';
import toast from 'react-hot-toast';
import { AiOutlineClose } from 'react-icons/ai';

const NoteCard = ({ note }: { note: Note }) => {
  return (
    <li
      className='w-full h-full rounded-xl flex flex-col p-6 shadow-md dark:shadow-none space-y-4 dark:opacity-90'
      style={{ backgroundColor: note.color }}>
      <div className='flex justify-between items-center'>
        <h2 className='text-3xl font-semibold'>{note.title}</h2>
        <button
          type='button'
          aria-label='Delete note'
          onClick={() =>
            axios
              .post('/api/deleteNote', note.id)
              .then(() => toast.success('Note deleted!'))
              .catch(() => toast.error('Something went wrong!'))
          }
          className='text-2xl'>
          <AiOutlineClose />
        </button>
      </div>
      <p className='text-xl'>{note.body}</p>
    </li>
  );
};

export default NoteCard;
