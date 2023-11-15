'use client';

import { AiOutlineRight } from 'react-icons/ai';
import { BsCalendar3 } from 'react-icons/bs';
import { useSidebarContext } from '../context/SidebarContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import { TaskWithList } from '@/typings';

const TaskListElement = ({ task }: { task: TaskWithList }) => {
  const { setTaskToUpdate, isTaskOpened, setIsTaskOpened, setTaskVariant } =
    useSidebarContext();

  const handleTaskComplete = () => {
    axios
      .post('/api/deleteTask', task)
      .then(() => toast.success('Task completed!'))
      .catch(() => toast.error('Something went wrong'));
  };

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
          <input
            type='checkbox'
            onChange={handleTaskComplete}
          />
          <span className='text-lg'>{task.title}</span>
        </div>
        {task.date && (
          <div className='flex space-x-3 items-center px-10 text-lg'>
            <BsCalendar3 />
            <span>{task.date}</span>
          </div>
        )}
        {task.list && (
          <div className='flex items-center px-10 space-x-3'>
            <div
              className='w-5 h-5 rounded-sm'
              style={{ backgroundColor: task.list.color }}
            />
            <span>{task.list.title}</span>
          </div>
        )}
        {task.body && <p className='flex px-10'>{task.body}</p>}
      </div>
      <button
        type='button'
        aria-label='Update task'
        onClick={() => {
          setTaskVariant('UPDATE');
          setTaskToUpdate({
            title: task.title,
            body: task.body,
            date: task.date,
            id: task.id,
            list: task.list,
          });
          setIsTaskOpened(!isTaskOpened);
        }}
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
