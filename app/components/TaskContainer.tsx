'use client';

import { Task } from '@prisma/client';
import { AiOutlinePlus } from 'react-icons/ai';
import { useSidebarContext } from '../context/SidebarContext';
import TaskListElement from './TaskListElement';
import clsx from 'clsx';
import EmptyState from './EmptyState';

interface TaskContainerProps {
  title: string;
  span?: boolean;
  tasks: Task[];
}

const TaskContainer: React.FC<TaskContainerProps> = ({
  title,
  span,
  tasks,
}) => {
  const { isTaskOpened, setIsTaskOpened } = useSidebarContext();
  return (
    <section
      className={clsx(
        'border border-background_DM/10 dark:border-background_LM/10 rounded-xl w-full flex flex-col space-y-2 p-4 overflow-hidden',
        span ? 'flex-1' : 'flex-2'
      )}>
      <div className='flex justify-between items-center mb-2'>
        <div className='flex items-center space-x-8'>
          <h1 className='text-2xl font-semibold'>{title}</h1>
          <span
            className={clsx(
              'py-1 px-2 rounded-md mr-1 tracking-tighter leading-snug bg-secondary_DM/20 dark:bg-secondary_LM/20 '
            )}>
            {tasks.length}
          </span>
        </div>
        <button
          type='button'
          aria-label='Add task'
          onClick={() => setIsTaskOpened(!isTaskOpened)}
          className='
          flex
          items-center
          p-1
          text-2xl
          rounded-full
          text-black
          dark:text-white
          bg-secondary_LM/50
          dark:bg-secondary_DM/50
          hover:bg-secondary_LM
          dark:hover:bg-secondary_DM'>
          <AiOutlinePlus />
        </button>
      </div>
      {tasks.length !== 0 ? (
        <ul
          className='
        divide-y
        divide-background_DM/10
        dark:divide-background_LM/10
        h-full
        overflow-auto
        scroll-smooth'>
          {tasks.map((task) => (
            <TaskListElement
              key={task.id}
              task={task}
            />
          ))}
        </ul>
      ) : (
        <EmptyState />
      )}
    </section>
  );
};

export default TaskContainer;
