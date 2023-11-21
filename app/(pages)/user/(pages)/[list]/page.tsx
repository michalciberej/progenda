import getListsByTitle from '@/app/actions/getListByTitle';
import EmptyState from '@/app/components/EmptyState';
import TaskListElement from '@/app/components/TaskListElement';
import MobileMenuButton from '@/app/components/buttons/MobileMenuButton';
import AddTaskButton from '@/app/components/buttons/AddTaskButton';
import { notFound } from 'next/navigation';

const ListsPage = async ({ params }: { params: { list: string } }) => {
  const list = await getListsByTitle(params.list);

  if (!list) notFound();

  return (
    <div className='w-full h-full flex flex-col space-y-6'>
      <section className='flex items-center justify-between text-3xl md:text-4xl lg:text-5xl '>
        <div className='flex items-center '>
          <MobileMenuButton />
          <h1 className='my-4'>
            {params.list.charAt(0).toUpperCase() + params.list.slice(1)}
          </h1>
          <span
            className='py-1 ml-4 px-2 rounded-md text-xl md:text-2xl lg:text-3xl'
            style={{ backgroundColor: list.color }}>
            {list._count.task}
          </span>
        </div>
        <AddTaskButton />
      </section>
      <section className='overflow-auto h-full flex flex-col space-y-6 border rounded-lg border-background_DM/10 dark:border-background_LM/10'>
        <ul className='h-full p-4'>
          {list.task.map((task, index) => (
            <TaskListElement
              key={index}
              task={task}
            />
          ))}
          {!list.task.length && <EmptyState />}
        </ul>
      </section>
    </div>
  );
};

export default ListsPage;
