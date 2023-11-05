import getTodayTasks from '@/app/actions/getTodayTasks';
import TaskContainer from '@/app/components/TaskContainer';

const TodayPage = async () => {
  const todayTasks = await getTodayTasks();

  return (
    <div>
      <section>
        <h1 className='text-5xl relative z-10 my-4'>Today</h1>
      </section>
      <div className='overflow-auto flex flex-col space-y-6'>
        <TaskContainer
          title='Today'
          tasks={todayTasks}
          span
        />
      </div>
    </div>
  );
};

export default TodayPage;
