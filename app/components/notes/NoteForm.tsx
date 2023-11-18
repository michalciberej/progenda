'use client';

import { useState } from 'react';
import StyledButton from '../buttons/StyledButton';
import axios from 'axios';
import toast from 'react-hot-toast';
import { NoteData } from '@/typings';

const colors = [
  '#f87171',
  '#f472b6',
  '#a78bfa',
  '#60a5fa',
  '#38bdf8',
  '#34d399',
  '#facc15',
  '#fb923c',
];

const NoteForm = () => {
  const [showForm, setShowForm] = useState(false);
  const [noteData, setNoteData] = useState<NoteData>({
    title: '',
    body: '',
    color: 'f87171',
  });

  return (
    <li className=' w-full h-full rounded-xl flex flex-col p-4 shadow-md dark:shadow-none relative'>
      <form className='flex flex-col justify-between h-full space-y-4'>
        <input
          type='text'
          placeholder='Title*'
          onChange={(e) =>
            setNoteData({ ...noteData, title: e.currentTarget.value })
          }
          className='w-full bg-transparent border-2 border-background_DM/20 dark:border-background_LM/20 py-1 px-2 rounded-lg placeholder:text-text_LM/50 dark:placeholder:text-text_DM/50'
        />
        <textarea
          placeholder='Description *'
          onChange={(e) =>
            setNoteData({ ...noteData, body: e.currentTarget.value })
          }
          className='w-full h-20 lg:h-28 bg-transparent max-h-[8rem] border-2 border-background_DM/20 dark:border-background_LM/20 p-2 rounded-lg resize-none placeholder:text-text_LM/50 dark:placeholder:text-text_DM/50'
        />
        <div className='flex justify-between items-center px-1'>
          {colors.map((color, index) => (
            <input
              checked={index === 0 ? true : false}
              key={index}
              type='radio'
              value={color}
              onClick={(e) =>
                setNoteData({ ...noteData, color: e.currentTarget.value })
              }
              className='appearance-none rounded-sm cursor-pointer w-6 h-6'
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
        <StyledButton
          primary
          fullWidth
          type='button'
          func={() => {
            axios
              .post('/api/createNote', noteData)
              .then(() => {
                toast.success('Note created!');
                setNoteData({ title: '', body: '', color: '' });
                setShowForm(false);
              })
              .catch(() => toast.error('Something went wrong!'));
          }}>
          Create Note
        </StyledButton>
      </form>
      {!showForm && (
        <button
          type='button'
          aria-label='Add note'
          onClick={() => setShowForm(!showForm)}
          className='text-8xl absolute w-full inset-0 z-10 bg-secondary_LM dark:bg-secondary_DM rounded-xl'>
          +
        </button>
      )}
    </li>
  );
};

export default NoteForm;
