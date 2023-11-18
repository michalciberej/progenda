import getTodayTasks from '@/app/actions/getTodayTasks';
import AddTaskButton from '@/app/components/buttons/AddTaskButton';
import TaskListElement from '@/app/components/TaskListElement';
import MobileMenuButton from '@/app/components/buttons/MobileMenuButton';

const TodayPage = async () => {
  const todayTasks = await getTodayTasks();

  return (
    <div>
      <section className='flex items-center text-3xl md:text-4xl lg:text-5xl justify-between'>
        <div className='flex items-center'>
          <MobileMenuButton />
          <h1 className='my-4'>Sticky Wall</h1>
        </div>
        <AddTaskButton />
      </section>
      <div className='overflow-auto flex flex-col space-y-6'>
        <ul>
          {todayTasks.map((task, index) => (
            <TaskListElement
              key={index}
              task={task}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodayPage;
