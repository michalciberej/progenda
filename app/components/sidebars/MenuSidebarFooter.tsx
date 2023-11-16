'use client';

import { useThemeContext } from '@/app/context/ThemeContext';
import { IoSettingsOutline } from 'react-icons/io5';
import { GoSignOut } from 'react-icons/go';
import { GoSun } from 'react-icons/go';
import { signOut } from 'next-auth/react';
import { User } from '@prisma/client';
import { FaRegMoon } from 'react-icons/fa6';
import Link from 'next/link';

import Avatar from '../Avatar';

const MenuSidebarFooter = ({
  user,
  isMenuOpened,
}: {
  user: User;
  isMenuOpened: boolean;
}) => {
  const { isDarkTheme, toggleTheme } = useThemeContext();

  return (
    <section className='mt-auto'>
      <div
        className={`flex flex-1 pt-4 text-xl justify-between ${
          isMenuOpened ? 'items-end' : 'flex-col items-center space-y-4'
        }`}>
        <div
          className={`flex items-center justify-center ${
            isMenuOpened ? 'flex-row space-x-4' : 'flex-col space-y-4'
          }`}>
          <button
            type='button'
            aria-label='Sign out'
            onClick={() => signOut()}>
            <GoSignOut />
          </button>
          <button
            type='button'
            aria-label='Change theme'
            onClick={toggleTheme}>
            {isDarkTheme ? <GoSun /> : <FaRegMoon />}
          </button>
          <Link
            href={'/user/settings'}
            type='button'
            aria-label='Settings'>
            <IoSettingsOutline />
          </Link>
        </div>
        <Avatar user={user} />
      </div>
    </section>
  );
};

export default MenuSidebarFooter;
