'use client';

import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import CreateListForm from '../CreateListForm';
import { ListWithTaskCount, TaskWithList } from '@/typings';
import { useSidebarContext } from '@/app/context/SidebarContext';
import { pusherClient } from '@/app/lib/pusher';

const MenuSidebarLists = ({ lists }: { lists: ListWithTaskCount[] }) => {
  const { isMenuOpened, setIsMenuOpened } = useSidebarContext();
  const [allLists, setAllLists] = useState<ListWithTaskCount[]>([]);
  const [isListFormOpened, setIsListFormOpened] = useState(false);
  const hiddenOrShown = isMenuOpened ? 'block' : 'hidden';
  const center = isMenuOpened ? 'justify-between' : 'justify-center';

  const toggleIsListFormOpened = () => {
    setIsListFormOpened(!isListFormOpened);
  };

  useEffect(() => {
    setAllLists(lists);
  }, [lists]);

  useEffect(() => {
    pusherClient.subscribe('new-list');
    pusherClient.subscribe('new-task');

    const listHandler = (list: ListWithTaskCount) => {
      setAllLists(allLists.concat(list));
    };

    const taskHandler = (task: TaskWithList) => {
      setAllLists(
        allLists.map((list) => {
          if (list.id === task.listId) {
            return { ...list, _count: { task: (list._count.task += 1) } };
          } else return list;
        })
      );
    };

    pusherClient.bind('list:new', listHandler);
    pusherClient.bind('task:new', taskHandler);

    return () => {
      pusherClient.unsubscribe('new-list');
      pusherClient.unsubscribe('new-task');
      pusherClient.unbind('list:new', listHandler);
      pusherClient.unbind('task:new', taskHandler);
    };
  }, [allLists]);

  useEffect(() => {
    pusherClient.subscribe('delete-list');
    pusherClient.subscribe('delete-task');

    const listHandler = (oldList: ListWithTaskCount) => {
      setAllLists(allLists.filter((list) => list.id !== oldList.id));
    };

    const taskHandler = (oldTask: TaskWithList) => {
      setAllLists(
        allLists.map((list) => {
          if (list.id === oldTask.listId) {
            return { ...list, _count: { task: (list._count.task -= 1) } };
          } else return list;
        })
      );
    };

    pusherClient.bind('list:delete', listHandler);
    pusherClient.bind('task:delete', taskHandler);

    return () => {
      pusherClient.unsubscribe('delete-list');
      pusherClient.unsubscribe('delete-task');
      pusherClient.unbind('list:delete', listHandler);
      pusherClient.unbind('task:delete', taskHandler);
    };
  }, [allLists]);

  return (
    <section>
      <div className='flex flex-col py-4'>
        <h2 className={`font-semibold mb-1 ${hiddenOrShown}`}>Lists</h2>
        <ul className='flex flex-col space-y-2'>
          {allLists.map((list, index) => (
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
          onClick={() => {
            toggleIsListFormOpened();
            setIsMenuOpened(true);
          }}
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
