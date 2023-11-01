import clsx from 'clsx';
import { AiOutlinePlus } from 'react-icons/ai';

interface TaskContainerProps {
  title: string;
  spanFullWidth?: boolean;
}

const TaskContainer: React.FC<TaskContainerProps> = ({
  title,
  spanFullWidth,
}) => {
  return (
    <section
      className={clsx(
        'border border-background_DM/10 rounded-xl w-full p-4',
        spanFullWidth && 'col-span-2'
      )}>
      <div className='flex justify-between items-center'>
        <h1 className='text-2xl font-semibold'>{title}</h1>
        <button
          type='button'
          className='flex items-center p-1 text-2xl rounded-full text-white bg-background_DM/50 hover:bg-background_DM transition-colors'>
          <AiOutlinePlus />
        </button>
      </div>
    </section>
  );
};

export default TaskContainer;
