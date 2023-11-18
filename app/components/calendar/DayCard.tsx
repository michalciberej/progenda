import { Day } from '@/typings';

const DayCard = ({ day }: { day: Day }) => {
  return (
    <li className='w-full h-32 border border-background_DM/10 dark:border-background_LM/10 p-2 rounded-md overflow-auto shadow-md'>
      <span className='font-semibold text-lg'>{day.number}</span>
      <ul className='flex flex-col space-y-1'>
        {day.tasks.map((task) => (
          <li
            key={task.id}
            className='rounded-md px-2 text-text_LM truncate'
            style={{ backgroundColor: task.list?.color }}>
            {task.title}
          </li>
        ))}
      </ul>
    </li>
  );
};

export default DayCard;
