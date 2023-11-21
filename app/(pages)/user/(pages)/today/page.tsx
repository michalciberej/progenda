import getTodayTasks from '@/app/actions/getTodayTasks';
import AddTaskButton from '@/app/components/buttons/AddTaskButton';
import TaskListElement from '@/app/components/TaskListElement';
import MobileMenuButton from '@/app/components/buttons/MobileMenuButton';
import EmptyState from '@/app/components/EmptyState';

const TodayPage = async () => {
  const todayTasks = await getTodayTasks();

  return (
    <div className='h-full flex flex-col'>
      <section className='flex items-center text-3xl md:text-4xl lg:text-5xl justify-between'>
        <div className='flex items-center'>
          <MobileMenuButton />
          <h1 className='my-4'>Today</h1>
        </div>
        <AddTaskButton />
      </section>
      <section className='overflow-auto h-full flex flex-col space-y-6 border rounded-lg border-background_DM/10 dark:border-background_LM/10'>
        <ul className='h-full p-4'>
          {todayTasks.map((task, index) => (
            <TaskListElement
              key={index}
              task={task}
            />
          ))}
          {!todayTasks.length && <EmptyState />}
        </ul>
      </section>
    </div>
  );
};

export default TodayPage;
