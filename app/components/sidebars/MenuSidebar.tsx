'use client';

import { GiHamburgerMenu } from 'react-icons/gi';
import { IoMdSettings } from 'react-icons/io';
import { GoSignOut } from 'react-icons/go';
import { signOut } from 'next-auth/react';
import { Task, User } from '@prisma/client';
import { useSidebarContext } from '@/app/context/SidebarContext';
import Avatar from '../Avatar';
import clsx from 'clsx';

import MenuSidebarTasks from './MenuSidebarTasks';
import MenuSidebarLists from './MenuSidebarLists';

const MenuSidebar = ({ user, tasks }: { user: User; tasks: Task[] }) => {
  const { isMenuOpened, setIsMenuOpened } = useSidebarContext();

  return (
    <aside
      className={clsx(
        `
      hidden
      lg:flex
      flex-col
      w-full
      h-full
      bg-secondary_LM
      p-4
      rounded-xl
      divide-y
      divide-background_DM/10
      transition-all`,
        isMenuOpened ? 'lg:w-80 space-y-8 ' : 'lg:w-14'
      )}>
      <section>
        <div className='flex justify-between items-center pb-4'>
          {isMenuOpened && <h1 className='text-2xl font-semibold'>Menu</h1>}
          <button
            type='button'
            aria-label='menu'
            onClick={() => setIsMenuOpened(!isMenuOpened)}
            className='text-2xl'>
            <GiHamburgerMenu />
          </button>
        </div>
      </section>
      <MenuSidebarTasks
        tasks={tasks}
        isMenuOpened={isMenuOpened}
      />
      <MenuSidebarLists isMenuOpened={isMenuOpened} />
      <section>
        <div
          className={`flex pt-4 justify-between items-center ${
            isMenuOpened ? 'text-2xl' : 'flex-col text-xl space-y-4'
          }`}>
          <div className='flex flex-col space-y-4'>
            <button
              type='button'
              className='flex items-center space-x-1'>
              <IoMdSettings />
              <span
                className={`text-base ${isMenuOpened ? 'block' : 'hidden'}`}>
                Sign out
              </span>
            </button>
            <button
              type='button'
              aria-label='sign out'
              onClick={() => signOut()}
              className='flex items-center space-x-1'>
              <GoSignOut />
              <span
                className={`text-base ${isMenuOpened ? 'block' : 'hidden'}`}>
                Sign out
              </span>
            </button>
          </div>
          <Avatar user={user} />
        </div>
      </section>
    </aside>
  );
};

export default MenuSidebar;
