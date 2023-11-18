'use client';

import { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { useForm, SubmitHandler } from 'react-hook-form';
import { TaskData } from '@/typings';
import { useSidebarContext } from '@/app/context/SidebarContext';
import toast from 'react-hot-toast';
import axios from 'axios';
import clsx from 'clsx';
import StyledButton from '../buttons/StyledButton';
import { List } from '@prisma/client';

const TaskSidebar = ({ lists }: { lists: List[] }) => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    taskToUpdate,
    setTaskToUpdate,
    isTaskOpened,
    setIsTaskOpened,
    taskVariant,
    setTaskVariant,
  } = useSidebarContext();
  const { register, handleSubmit, reset } = useForm<TaskData>({
    defaultValues: {
      title: '',
      body: '',
      date: '',
      list: '',
    },
    values: {
      title: taskToUpdate.title,
      body: taskToUpdate.body,
      date: taskToUpdate.date,
      list: taskToUpdate.list?.title,
    },
  });

  const onSubmit: SubmitHandler<TaskData> = (taskData) => {
    setIsLoading(true);

    if (taskVariant === 'CREATE') {
      axios
        .post('/api/createTask', {
          ...taskData,
          id: taskToUpdate.id,
          list: taskData.list,
        })
        .then(() => {
          toast.success('Task created!');
          setIsTaskOpened(false);
          setTaskToUpdate({
            title: '',
            body: '',
            date: '',
            id: '',
            list: { title: '', color: '', id: '', userId: '' },
          });
        })
        .catch(() => toast.error('Something went wrong!'))
        .finally(() => setIsLoading(false));
    }

    if (taskVariant === 'UPDATE') {
      axios
        .post('/api/updateTask', {
          ...taskData,
          id: taskToUpdate.id,
          list: taskData.list,
        })
        .then(() => {
          toast.success('Task updated!');
          setIsTaskOpened(false);
          setTaskToUpdate({
            title: '',
            body: '',
            date: '',
            id: '',
            list: { title: '', color: '', id: '', userId: '' },
          });
        })
        .catch(() => toast.error('Something went wrong!'))
        .finally(() => setIsLoading(false));
    }
  };

  return (
    <aside
      className={clsx(
        'flex-col w-full flex bg-secondary_LM dark:bg-secondary_DM  lg:rounded-xl p-4 placeholder:text-text_LM/70 dark:placeholder:text-text_DM/70',
        isTaskOpened
          ? 'fixed lg:static z-40 inset-0 lg:max-w-[30rem]'
          : 'hidden'
      )}>
      <div className='w-full flex justify-between items-center mb-8'>
        <h1 className='text-2xl font-semibold'>
          {taskVariant === 'CREATE' ? 'Create Task' : 'Update Task'}
        </h1>
        <button
          type='button'
          onClick={() => {
            setTaskVariant('CREATE');
            setIsTaskOpened(!isTaskOpened);
            setTaskToUpdate({
              title: '',
              body: '',
              date: '',
              id: '',
              list: { title: '', color: '', id: '', userId: '' },
            });
            reset();
          }}
          className='text-2xl'>
          <AiOutlineClose />
        </button>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='w-full flex flex-col justify-between h-full'>
        <div className='flex flex-col space-y-4'>
          <input
            type='text'
            placeholder='Title *'
            defaultValue={taskToUpdate.title}
            className='w-full bg-transparent border-2 border-background_DM/20 dark:border-background_LM/20 p-2 rounded-lg placeholder:text-text_LM/50 dark:placeholder:text-text_DM/50'
            {...register('title', { required: true })}
          />
          <textarea
            placeholder='Description'
            defaultValue={taskToUpdate.body}
            className='w-full h-full bg-transparent max-h-[8rem] border-2 border-background_DM/20 dark:border-background_LM/20 p-2 rounded-lg resize-none placeholder:text-text_LM/50 dark:placeholder:text-text_DM/50'
            {...register('body', { maxLength: 50 })}
          />
          <label
            htmlFor='date'
            className='flex items-center'>
            Date
            <input
              type='date'
              id='date'
              className='bg-transparent ml-3 border-2 border-background_DM/20 dark:border-background_LM/20 rounded-md py-1 px-2'
              {...register('date')}
            />
          </label>
          <label
            htmlFor='list'
            className='flex items-center'>
            List
            <select
              id='list'
              {...register('list')}
              className='bg-transparent border-2 border-background_DM/20 dark:border-background_LM/20 rounded-md py-1 px-2 ml-5'>
              {lists.map((list, index) => (
                <option
                  key={index}
                  value={list.id}
                  style={{ backgroundColor: list.color }}>
                  {list.title}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className={`${taskVariant === 'UPDATE' && 'space-y-2'}`}>
          <StyledButton
            disabled={isLoading}
            primary
            fullWidth>
            {taskVariant === 'CREATE' ? 'Create' : 'Update'}
          </StyledButton>
          {taskVariant === 'UPDATE' && (
            <StyledButton
              func={() => {
                console.log(taskToUpdate);
                axios
                  .post('/api/deleteTask', taskToUpdate)
                  .then(() => {
                    toast.success('Task deleted!');
                    setIsTaskOpened(false);
                    setTaskToUpdate({
                      title: '',
                      body: '',
                      date: '',
                      id: '',
                      list: { title: '', color: '', id: '', userId: '' },
                    });
                    setTaskVariant('CREATE');
                    reset();
                  })
                  .catch(() => toast.error('Something went wrong!'))
                  .finally(() => setIsLoading(false));
              }}
              disabled={isLoading}
              type='button'
              accent
              fullWidth>
              Delete
            </StyledButton>
          )}
        </div>
      </form>
    </aside>
  );
};

export default TaskSidebar;
