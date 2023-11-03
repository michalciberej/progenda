'use client';

import { Task } from '@prisma/client';
import { AiOutlineRight } from 'react-icons/ai';
import { BsCalendar3 } from 'react-icons/bs';

const TaskListElement = ({ task }: { task: Task }) => {
  return (
    <li className='w-full p-3 flex justify-between'>
      <div
        className='
      flex
      space-x-10
      divide-x-2
      divide-background_DM/10
      dark:divide-background_LM/10
      '>
        <div className='flex items-center space-x-4'>
          <input type='checkbox' />
          <span className='text-lg'>{task.title}</span>
        </div>
        {task.date && (
          <div className='flex space-x-3 items-center px-10 text-lg'>
            <BsCalendar3 />
            <span>{task.date}</span>
          </div>
        )}
        
      </div>
      <button
        type='button'
        className='
        text-text_LM/50
        hover:text-text_LM
        dark:text-text_DM/50
        hover:dark:text-text_DM
        transition-colors'>
        <AiOutlineRight />
      </button>
    </li>
  );
};

export default TaskListElement;
