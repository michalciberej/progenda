import React from 'react';
import TaskContainer from '@/app/components/TaskContainer';
import getTasks from '@/app/actions/getTasks';
import filterTasks from '@/app/lib/filterTasks';

const UpcomingPage = async () => {
  const tasks = await getTasks();
  const todayTasks = filterTasks(tasks, 'today');

  return (
    <div className='w-full h-full flex flex-col space-y-6'>
      <section>
        <h1 className='text-5xl relative z-10 text-text_LM my-4'>Upcoming</h1>
      </section>
      <div className='overflow-auto flex flex-col space-y-6'>
        <TaskContainer
          tasks={todayTasks}
          title='Today'
          span
        />
        <TaskContainer
          title='Tomorrow'
          tasks={tasks}
        />
        <TaskContainer
          title='Total'
          tasks={tasks}
        />
      </div>
    </div>
  );
};

export default UpcomingPage;
