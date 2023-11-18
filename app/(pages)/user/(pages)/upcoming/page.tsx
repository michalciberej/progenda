import React from 'react';
import TaskContainer from '@/app/components/TaskContainer';
import getTodayTasks from '@/app/actions/getTodayTasks';
import getTomorrowTasks from '@/app/actions/getTomorrowTasks';
import getThisWeekTasks from '@/app/actions/getThisWeekTasks';
import AddTaskButton from '@/app/components/buttons/AddTaskButton';
import MobileMenuButton from '@/app/components/buttons/MobileMenuButton';

const UpcomingPage = async () => {
  const todayTasks = await getTodayTasks();
  const tomorrowTasks = await getTomorrowTasks();
  const thisWeekTasks = await getThisWeekTasks();

  return (
    <div className='w-full h-full flex flex-col space-y-6'>
      <section className='flex items-center text-3xl md:text-4xl lg:text-5xl justify-between'>
        <div className='flex items-center'>
          <MobileMenuButton />
          <h1 className='my-4'>Sticky Wall</h1>
        </div>
        <AddTaskButton />
      </section>
      <div className='overflow-auto flex flex-col space-y-6'>
        <TaskContainer
          title='Today'
          tasks={todayTasks}
          date='today'
        />
        <TaskContainer
          title='Tomorrow'
          tasks={tomorrowTasks}
          date='tomorrow'
        />
        <TaskContainer
          title='This Week'
          tasks={thisWeekTasks}
          date='total'
        />
      </div>
    </div>
  );
};

export default UpcomingPage;
