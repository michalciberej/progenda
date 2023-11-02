'use client';

import { Task } from '@prisma/client';
import { AiOutlinePlus } from 'react-icons/ai';
import { useSidebarContext } from '../context/SidebarContext';
import TaskListElement from './TaskListElement';
import clsx from 'clsx';

interface TaskContainerProps {
  title: string;
  span?: boolean;
  tasks: Task[];
}

const TaskContainer: React.FC<TaskContainerProps> = ({
  title,
  span,
  tasks,
}) => {
  const { isTaskOpened, setIsTaskOpened } = useSidebarContext();
  return (
    <section
      className={clsx(
        'border border-background_DM/10 rounded-xl w-full flex flex-col space-y-2 p-4 overflow-hidden',
        span ? 'flex-2' : 'flex-1'
      )}>
      <div className='flex justify-between items-center mb-2'>
        <h1 className='text-2xl font-semibold'>{title}</h1>
        <button
          type='button'
          aria-label='Add task'
          onClick={() => setIsTaskOpened(!isTaskOpened)}
          className='flex items-center p-1 text-2xl rounded-full text-white bg-background_DM/50 hover:bg-background_DM transition-colors'>
          <AiOutlinePlus />
        </button>
      </div>
      {tasks.length !== 0 ? (
        <ul className='divide-y divide-background_DM/10 h-full overflow-auto scroll-smooth'>
          {tasks.map((task) => (
            <TaskListElement
              key={task.id}
              task={task}
            />
          ))}
        </ul>
      ) : (
        <p>Empty</p> // CHANGE FOR EMPTYSTATE COMPONENT LATER
      )}
    </section>
  );
};

export default TaskContainer;
