import getTasks from '@/app/actions/getTasks';
import CalendarContainer from '@/app/components/calendar/CalendarContainer';

const CalendarPage = async () => {
  const tasks = await getTasks();

  return (
    <div className='w-full h-full flex flex-col space-y-6'>
      <section>
        <h1 className='text-5xl my-4'>Calendar</h1>
      </section>
      <CalendarContainer tasks={tasks} />
    </div>
  );
};

export default CalendarPage;
