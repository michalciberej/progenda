import React from 'react';
import TaskContainer from '@/app/components/TaskContainer';

const UpcomingPage = () => {
  return (
    <div className='w-full h-full flex flex-col space-y-6'>
      <section>
        <h1 className='text-5xl relative z-10 text-text_LM my-4'>Upcoming</h1>
      </section>
      <div className='h-full grid md:grid-cols-2 md:grid-rows-2 gap-6'>
        <TaskContainer
          title='Today'
          spanFullWidth
        />
        <TaskContainer title='Tomorrow' />
        <TaskContainer title='This Week' />
      </div>
    </div>
  );
};

export default UpcomingPage;
