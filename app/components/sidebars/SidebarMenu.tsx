'use client';

import prisma from '@/app/lib/prismadb';
import Link from 'next/link';
import { GiHamburgerMenu } from 'react-icons/gi';
import { MdKeyboardDoubleArrowRight } from 'react-icons/md';
import { BsListCheck } from 'react-icons/bs';
import { FaStickyNote } from 'react-icons/fa';
import { usePathname } from 'next/navigation';
import { IoMdSettings } from 'react-icons/io';
import { GoSignOut } from 'react-icons/go';
import { signOut } from 'next-auth/react';
import clsx from 'clsx';
import Image from 'next/image';

const SidebarMenu = () => {
  const pathname = usePathname().split('/').pop();

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
      <section>
        <div className='flex flex-col py-4'>
          <h2 className='font-semibold mb-1'>Tasks</h2>
          <ul className='flex flex-col space-y-2'>
            <li
              className={clsx(
                `flex items-center justify-between rounded-lg py-2 px-2`,
                pathname === 'upcoming' && 'bg-background_DM/20'
              )}>
              <Link
                href={'/users/upcoming'}
                className={`flex items-center gap-2 ${
                  pathname === 'upcoming' && 'font-semibold'
                }`}>
                <MdKeyboardDoubleArrowRight className='text-xl' />
                Upcoming
              </Link>
              <span
                className={clsx(
                  `px-1 rounded-sm mr-1`,
                  pathname === 'upcoming'
                    ? 'bg-secondary_LM'
                    : 'bg-secondary_DM/20'
                )}>
                12
              </span>
            </li>
            <li
              className={clsx(
                `flex items-center justify-between rounded-lg py-2 px-2`,
                pathname === 'today' && 'bg-background_DM/20'
              )}>
              <Link
                href={'/users/today'}
                className={`flex items-center gap-2 ${
                  pathname === 'today' && 'font-semibold'
                }`}>
                <BsListCheck className='text-xl' />
                Today
              </Link>
              <span
                className={clsx(
                  `px-1 rounded-sm mr-1`,
                  pathname === 'today'
                    ? 'bg-secondary_LM'
                    : 'bg-secondary_DM/20'
                )}>
                12
              </span>
            </li>
            <li
              className={clsx(
                `flex items-center justify-between rounded-lg py-2 px-2`,
                pathname === 'sticky-wall' && 'bg-background_DM/20'
              )}>
              <Link
                href={'/users/sticky-wall'}
                className={`flex items-center gap-2 ${
                  pathname === 'sticky-wall' && 'font-semibold'
                }`}>
                <FaStickyNote className='text-xl' />
                sticky-wall
              </Link>
              <span
                className={clsx(
                  `px-1 rounded-sm mr-1`,
                  pathname === 'sticky-wall'
                    ? 'bg-secondary_LM'
                    : 'bg-secondary_DM/20'
                )}>
                12
              </span>
            </li>
          </ul>
        </div>
      </section>
      <section>
        <div className='flex flex-col py-4'>
          <h2 className='font-semibold'>Lists</h2>
        </div>
      </section>
      <section>
        <div className='flex pt-4 justify-between items-center '>
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
          <Image
            src={'/#'}
            alt={''}
            width={50}
            height={50}
            priority
            className='object-cover h-full rounded-full'
          />
        </div>
      </section>
    </aside>
  );
};

export default SidebarMenu;
