import React from 'react';
import TaskContainer from '@/app/components/TaskContainer';
import getTodayTasks from '@/app/actions/getTodayTasks';
import getTomorrowTasks from '@/app/actions/getTomorrowTasks';
import getThisWeekTasks from '@/app/actions/getThisWeekTasks';

const UpcomingPage = async () => {
  const todayTasks = await getTodayTasks();
  const tomorrowTasks = await getTomorrowTasks();
  const thisWeekTasks = await getThisWeekTasks();

  return (
    <div className='w-full h-full flex flex-col space-y-6'>
      <section>
        <h1 className='text-5xl my-4'>Upcoming</h1>
      </section>
      <div className='overflow-auto flex flex-col space-y-6'>
        <TaskContainer
          title='Today'
          tasks={todayTasks}
          span
        />
        <TaskContainer
          title='Tomorrow'
          tasks={tomorrowTasks}
        />
        <TaskContainer
          title='This Week'
          tasks={thisWeekTasks}
        />
      </div>
    </div>
  );
};

export default UpcomingPage;
