'use client';

import { Task } from '@prisma/client';
import { AiOutlineRight } from 'react-icons/ai';

const TaskListElement = ({ task }: { task: Task }) => {
  
  
  return (
    <li className='w-full p-3 flex justify-between'>
      <div className='flex space-x-4'>
        <input type='checkbox' />
        <span>{task.title}</span>
      </div>
      <button
        type='button'
        className='text-text_LM/50 hover:text-text_LM transition-colors'>
        <AiOutlineRight />
      </button>
    </li>
  );
};

export default TaskListElement;
