import getTasks from '@/app/actions/getTasks';
import CalendarContainer from '@/app/components/calendar/CalendarContainer';
import MobileMenuButton from '@/app/components/buttons/MobileMenuButton';

const CalendarPage = async () => {
  const tasks = await getTasks();

  return (
    <div className='w-full h-full flex flex-col space-y-6'>
      <section className='flex items-center text-3xl md:text-4xl lg:text-5xl'>
        <MobileMenuButton />
        <h1 className='my-4'>Sticky Wall</h1>
      </section>
      <CalendarContainer tasks={tasks} />
    </div>
  );
};

export default CalendarPage;
