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
import StyledButton from '../buttons/StyledButton';

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
        'hidden flex-col w-full max-w-[30rem] bg-secondary_LM dark:bg-secondary_DM  rounded-xl p-4 space-y-8 placeholder:text-text_LM/70 dark:placeholder:text-text_DM/70',
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
        className='w-full space-y-4 flex flex-col justify-between  h-full'>
        <div className='flex flex-col space-y-4'>
          <input
            type='text'
            placeholder='Title *'
            className='w-full bg-transparent border p-2 rounded-lg'
            {...register('title', { required: true })}
          />
          <textarea
            placeholder='Description'
            className='w-full h-full bg-transparent max-h-[8rem] border p-2 rounded-lg'
            {...register('body', { maxLength: 50 })}
          />
          <label htmlFor='date'>
            Date
            <input
              type='date'
              id='date'
              {...register('date')}
            />
          </label>
        </div>
        <div className='w-full flex space-x-4'>
          <StyledButton
            secondary
            fullWidth>
            Delete
          </StyledButton>
          <StyledButton
            primary
            fullWidth>
            Create
          </StyledButton>
        </div>
      </form>
    </aside>
  );
};

export default TaskSidebar;
