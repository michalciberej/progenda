'use client';

import { Task } from '@prisma/client';
import TaskListElement from './TaskListElement';
import clsx from 'clsx';
import EmptyState from './EmptyState';
import { Suspense } from 'react';

interface TaskContainerProps {
  title: string;
  tasks: Task[];
}

const TaskContainer: React.FC<TaskContainerProps> = ({ title, tasks }) => {
  return (
    <section
      className={clsx(
        'border border-background_DM/10 dark:border-background_LM/10 rounded-xl w-full flex flex-col space-y-2 p-4 overflow-hidden h-80'
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
