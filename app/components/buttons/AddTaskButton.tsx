'use client';

import { useSidebarContext } from '@/app/context/SidebarContext';
import { AiOutlinePlus } from 'react-icons/ai';

const AddTaskButton = () => {
  const { setIsTaskOpened } = useSidebarContext();

  return (
    <button
      type='button'
      aria-label='Add task'
      onClick={() => setIsTaskOpened(true)}
      className='
          flex
          items-center
          p-1
          text-2xl
          lg:text-4xl
          rounded-full
          text-black
          dark:text-white
          bg-secondary_LM/50
          dark:bg-secondary_DM/50
          hover:bg-secondary_LM
          dark:hover:bg-secondary_DM'>
      <AiOutlinePlus />
    </button>
  );
};

export default AddTaskButton;
