'use client';

import { GiHamburgerMenu } from 'react-icons/gi';
import { IoMdSettings } from 'react-icons/io';
import { GoSignOut } from 'react-icons/go';
import { signOut } from 'next-auth/react';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { Task, User } from '@prisma/client';
import Avatar from '../Avatar';
import Tasks from './Tasks';

const SidebarMenu = ({ user, tasks }: { user: User; tasks: Task[] }) => {
  const [isOpened, setIsOpened] = useState(true);
  const session = useSession();

  return (
    <aside className='hidden lg:flex flex-col space-y-8 w-full md:max-w-[20rem] h-full bg-secondary_LM p-4 rounded-xl divide-y divide-background_DM/10'>
      <section>
        <div className='flex justify-between items-center'>
          <h1 className='text-2xl font-semibold'>Menu</h1>
          <button
            type='button'
            className='text-2xl'>
            <GiHamburgerMenu />
          </button>
        </div>
      </section>
      <Tasks tasks={tasks} />
      <section>
        <div className='flex flex-col py-4'>
          <h2 className='font-semibold'>Lists</h2>
        </div>
      </section>
      <section>
        <div className='flex pt-4 justify-between items-center'>
          <div className='flex flex-col space-y-2'>
            <button
              type='button'
              className='flex gap-2'>
              <IoMdSettings className='text-2xl' />
              Settings
            </button>
            <button
              type='button'
              onClick={() => signOut()}
              className='flex gap-2'>
              <GoSignOut className='text-2xl' />
              Sign out
            </button>
          </div>
          <Avatar user={user} />
        </div>
      </section>
    </aside>
  );
};

export default SidebarMenu;
