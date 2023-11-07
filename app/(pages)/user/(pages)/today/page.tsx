import getTodayTasks from '@/app/actions/getTodayTasks';
import TaskContainer from '@/app/components/TaskContainer';
import TaskListElement from '@/app/components/TaskListElement';

const TodayPage = async () => {
  const todayTasks = await getTodayTasks();

  return (
    <div>
      <section>
        <h1 className='text-5xl relative z-10 my-4'>Today</h1>
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
