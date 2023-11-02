'use client';

import { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { useForm, SubmitHandler } from 'react-hook-form';
import { TaskData } from '@/typings';
import { useRouter } from 'next/navigation';
import { useSidebarContext } from '@/app/context/SidebarContext';
import toast from 'react-hot-toast';
import axios from 'axios';
import clsx from 'clsx';

const TaskSidebar = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit } = useForm<TaskData>({
    defaultValues: { title: '', body: '', date: '' },
  });
  const { isTaskOpened, setIsTaskOpened } = useSidebarContext();
  const router = useRouter();

  const onSubmit: SubmitHandler<TaskData> = (taskData) => {
    setIsLoading(true);

    axios
      .post('/api/createTask', taskData)
      .then(() => {
        toast.success('Succes!');
      })
      .catch(() => toast.error('Something went wrong!'))
      .finally(() => {
        setIsLoading(false);
        router.refresh();
      });
  };

  return (
    <aside
      className={clsx(
        'hidden flex-col w-full max-w-[30rem] bg-secondary_LM rounded-xl p-4 space-y-8',
        isTaskOpened ? 'lg:flex' : 'lg:hidden'
      )}>
      <div className='w-full flex justify-between '>
        <h1 className='text-2xl font-semibold'>Create Task</h1>
        <button
          type='button'
          onClick={() => setIsTaskOpened(!isTaskOpened)}
          className='text-2xl'>
          <AiOutlineClose />
        </button>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='w-full space-y-4'>
        <input
          type='text'
          placeholder='Title *'
          className='w-full bg-transparent border border-background_DM/50 p-2 placeholder:text-text_LM/70 rounded-lg'
          {...register('title', { required: true })}
        />
        <textarea
          placeholder='Description'
          className='w-full h-full max-h-[8rem] bg-transparent border border-background_DM/50 p-2 placeholder:text-text_LM/70 rounded-lg'
          {...register('body', { maxLength: 50 })}
        />
        <input
          type='date'
          {...register('date')}
        />
        <button>Create</button>
      </form>
    </aside>
  );
};

export default TaskSidebar;