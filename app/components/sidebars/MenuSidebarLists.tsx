'use client';

import clsx from 'clsx';
import { useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import CreateListForm from '../CreateListForm';
import { ListWithTaskCount } from '@/typings';

const MenuSidebarLists = ({
  lists,
  isMenuOpened,
}: {
  lists: ListWithTaskCount[];
  isMenuOpened: boolean;
}) => {
  const [isListFormOpened, setIsListFormOpened] = useState(true);
  const hiddenOrShown = isMenuOpened ? 'block' : 'hidden';
  const center = isMenuOpened ? 'justify-between' : 'justify-center';

  const toggleIsListFormOpened = () => {
    setIsListFormOpened(!isListFormOpened);
  };

  return (
    <section>
      <div className='flex flex-col py-4'>
        <h2 className={`font-semibold mb-1 ${hiddenOrShown}`}>Lists</h2>
        <ul className='flex flex-col space-y-2'>
          {lists.map((list, index) => (
            <li
              key={index}
              className={clsx(
                `flex items-center rounded-lg py-2 px-2`,
                center
              )}>
              <div className='flex items-center space-x-2'>
                <div
                  className='w-5 h-5 rounded-sm'
                  style={{ backgroundColor: list.color }}
                />
                <span className={hiddenOrShown}>{list.title}</span>
              </div>
              <span
                className={clsx(
                  `py-1 px-2 rounded-md mr-1 tracking-tighter leading-snug bg-secondary_DM/20 dark:bg-secondary_LM/20`,
                  hiddenOrShown
                )}>
                {list._count.task}
              </span>
            </li>
          ))}
        </ul>
        <button
          type='button'
          aria-label='Add new list'
          onClick={toggleIsListFormOpened}
          className={clsx(
            ' rounded-lg px-2 py-1 mt-2 flex items-center text-xl',
            isMenuOpened ? 'space-x-2' : 'justify-center'
          )}>
          <AiOutlinePlus className='shrink-0' />
          <span className={clsx('text-base', hiddenOrShown)}>Add New List</span>
        </button>
      </div>
      {isListFormOpened && (
        <CreateListForm
          isMenuOpened={isMenuOpened}
          toggleIsListFormOpened={toggleIsListFormOpened}
        />
      )}
    </section>
  );
};

export default MenuSidebarLists;
