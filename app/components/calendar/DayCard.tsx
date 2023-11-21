import { Day } from '@/typings';
import axios from 'axios';
import toast from 'react-hot-toast';
import { IoClose } from 'react-icons/io5';

const DayCard = ({ day }: { day: Day }) => {
  return (
    <li className='w-full h-32 border border-background_DM/10 dark:border-background_LM/10 p-2 rounded-md overflow-auto shadow-md'>
      <span className='font-semibold text-lg'>{day.number}</span>
      <ul className='flex flex-col space-y-1'>
        {day.tasks.map((task) => (
          <li
            key={task.id}
            className='rounded-md px-2 flex items-center justify-between text-text_LM truncate'
            style={{ backgroundColor: task.list?.color }}>
            <span>{task.title}</span>
            <button
              onClick={() =>
                axios
                  .post('/api/deleteTask', task)
                  .then(() => toast.success('Task deleted!'))
                  .catch(() => toast.error('Something went wrong!'))
              }
              type='button'
              aria-label='Delete task'>
              <IoClose />
            </button>
          </li>
        ))}
      </ul>
    </li>
  );
};

export default DayCard;
