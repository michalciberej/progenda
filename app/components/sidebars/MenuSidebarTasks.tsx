'use client';

import { MdKeyboardDoubleArrowRight } from 'react-icons/md';
import { BsListCheck } from 'react-icons/bs';
import { usePathname } from 'next/navigation';
import { Task } from '@prisma/client';
import clsx from 'clsx';
import Link from 'next/link';
import getTaskAmount from '@/app/lib/getTaskAmount';

const MobileSidebar = ({
  tasks,
  isMenuOpened,
}: {
  tasks: Task[];
  isMenuOpened: boolean;
}) => {
  const pathname = usePathname().split('/').pop();
  const upcomingTasks = getTaskAmount(tasks, 'total') || 0;
  const todayTasks = getTaskAmount(tasks, 'today');

  const hiddenOrShown = isMenuOpened ? 'block' : 'hidden';
  const center = isMenuOpened ? 'justify-between' : 'justify-center';

  return (
    <section>
      <div className='flex flex-col py-4'>
        <h2 className={`font-semibold mb-1 ${hiddenOrShown}`}>Tasks</h2>
        <nav>
          <ul className='flex flex-col space-y-2'>
            <li
              className={clsx(
                `flex items-center rounded-lg py-2 px-2`,
                pathname === 'upcoming' &&
                  'bg-background_DM/20 dark:bg-background_DM/40',
                center
              )}>
              <Link
                href={'/user/upcoming'}
                className={`flex items-center space-x-2 ${
                  pathname === 'upcoming' && 'font-semibold'
                }`}>
                <MdKeyboardDoubleArrowRight className='text-xl' />
                <span className={hiddenOrShown}>Upcoming</span>
              </Link>
              <span
                className={clsx(
                  `py-1 px-2 rounded-md mr-1 tracking-tighter leading-snug`,
                  pathname === 'upcoming'
                    ? 'bg-secondary_LM dark:bg-secondary_DM'
                    : 'bg-secondary_DM/20 dark:bg-secondary_LM/20',
                  hiddenOrShown
                )}>
                {upcomingTasks}
              </span>
            </li>
            <li
              className={clsx(
                `flex items-center rounded-lg py-2 px-2`,
                pathname === 'today' && 'bg-background_DM/20',
                center
              )}>
              <Link
                href={'/user/today'}
                className={`flex items-center gap-2 ${
                  pathname === 'today' && 'font-semibold'
                }`}>
                <BsListCheck className='text-xl' />
                <span className={hiddenOrShown}>Today</span>
              </Link>
              <span
                className={clsx(
                  `py-1 px-2 rounded-md mr-1 tracking-tighter leading-snug`,
                  pathname === 'today'
                    ? 'bg-secondary_LM dark:bg-secondary_DM'
                    : 'bg-secondary_DM/20 dark:bg-secondary_LM/20',
                  hiddenOrShown
                )}>
                {todayTasks}
              </span>
            </li>
          </ul>
        </nav>
      </div>
    </section>
  );
};

export default MobileSidebar;
