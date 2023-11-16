import getTodayTasks from '@/app/actions/getTodayTasks';
import AddTaskButton from '@/app/components/buttons/AddTaskButton';
import TaskListElement from '@/app/components/TaskListElement';

const TodayPage = async () => {
  const todayTasks = await getTodayTasks();

  return (
    <div>
      <section className='flex items-center justify-between'>
        <h1 className='text-5xl my-4'>Today</h1>
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
