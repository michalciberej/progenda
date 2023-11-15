'use client';

import { Task } from '@prisma/client';
import TaskListElement from './TaskListElement';
import clsx from 'clsx';
import EmptyState from './EmptyState';
import { useEffect, useState } from 'react';
import { pusherClient } from '../lib/pusher';
import { Variant } from '@/typings';
import getCurrentDate from '../lib/getCurrentDate';

interface TaskContainerProps {
  title: string;
  tasks: Task[];
  date: Variant;
}

const TaskContainer: React.FC<TaskContainerProps> = ({
  title,
  tasks,
  date,
}) => {
  const [allTasks, setAllTasks] = useState<Task[]>(tasks);
  const { today, tomorrow } = getCurrentDate();

  useEffect(() => {
    pusherClient.subscribe('new-task');

    const taskHandler = (task: Task) => {
      setAllTasks(allTasks.concat(task));
    };

    pusherClient.bind('task:new', taskHandler);

    return () => {
      pusherClient.unsubscribe('new-task');
      pusherClient.unbind('task:new', taskHandler);
    };
  }, [allTasks]);

  useEffect(() => {
    pusherClient.subscribe('delete-task');

    const taskHandler = (oldTask: Task) => {
      setAllTasks(allTasks.filter((task: Task) => task.id !== oldTask.id));
    };

    pusherClient.bind('task:delete', taskHandler);

    return () => {
      pusherClient.unsubscribe('delete-task');
      pusherClient.unbind('task:delete', taskHandler);
    };
  }, [allTasks]);

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
            {allTasks.reduce((acc, cur) => {
              if (date === 'today' && cur.date === today) acc += 1;
              if (date === 'tomorrow' && cur.date === tomorrow) acc += 1;
              if (
                date === 'total' &&
                cur.date !== today &&
                cur.date !== tomorrow
              )
                acc += 1;
              return acc;
            }, 0)}
          </span>
        </div>
      </div>
      {allTasks.reduce((acc, cur) => {
        if (date === 'today' && cur.date === today) acc += 1;
        if (date === 'tomorrow' && cur.date === tomorrow) acc += 1;
        if (date === 'total' && cur.date !== today && cur.date !== tomorrow)
          acc += 1;
        return acc;
      }, 0) !== 0 ? (
        <ul
          className='
          divide-y
          divide-background_DM/10
          dark:divide-background_LM/10
          h-full
          overflow-auto
          scroll-smooth'>
          {allTasks.map((task) => {
            if (date === 'today' && task.date === today)
              return (
                <TaskListElement
                  key={task.id}
                  task={task}
                />
              );

            if (date === 'tomorrow' && task.date === tomorrow)
              return (
                <TaskListElement
                  key={task.id}
                  task={task}
                />
              );

            if (
              date === 'total' &&
              task.date !== today &&
              task.date !== tomorrow
            )
              return (
                <TaskListElement
                  key={task.id}
                  task={task}
                />
              );
          })}
        </ul>
      ) : (
        <EmptyState />
      )}
    </section>
  );
};

export default TaskContainer;
