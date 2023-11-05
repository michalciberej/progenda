'use client';

import { useState } from 'react';
import { ListData } from '@/typings';
import { useRouter } from 'next/navigation';

import clsx from 'clsx';
import axios from 'axios';
import toast from 'react-hot-toast';

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

const CreateListForm = ({
  isMenuOpened,
  toggleIsListFormOpened,
}: {
  isMenuOpened: boolean;
  toggleIsListFormOpened: () => void;
}) => {
  const [listData, setListData] = useState<ListData>({
    title: '',
    color: '#f87171',
  });
  const hiddenOrShown = isMenuOpened ? 'block' : 'hidden';
  const router = useRouter();

  const onSubmit = () => {
    axios
      .post('/api/createList', listData)
      .then(() => {
        toast.success('List created!');
        toggleIsListFormOpened();
        router.refresh();
      })
      .catch(() => toast.error('Something went wrong!'));
  };

  return (
    <form
      onSubmit={onSubmit}
      className={clsx(
        'border-2 rounded-xl flex flex-col space-y-2 border-background_DM/50 p-3 dark:border-background_LM/20',
        hiddenOrShown
      )}>
      <div className='flex border-2 items-center px-2 rounded-lg dark:border-background_LM/10'>
        <div
          className='w-5 h-5 bg-white rounded-sm'
          style={{ backgroundColor: listData.color }}
        />
        <input
          type='text'
          required
          placeholder='List name'
          value={listData.title}
          onChange={(e) =>
            setListData({ ...listData, title: e.currentTarget.value })
          }
          className='w-full bg-transparent py-1 px-2 '
        />
      </div>
      <div className='flex justify-between items-center px-1'>
        {colors.map((color, index) => (
          <input
            checked={index === 0 ? true : false}
            key={index}
            type='radio'
            value={color}
            onClick={(e) =>
              setListData({ ...listData, color: e.currentTarget.value })
            }
            className='appearance-none rounded-sm cursor-pointer w-4 h-4'
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
    </form>
  );
};

export default CreateListForm;
