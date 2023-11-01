'use client';

import { MdKeyboardDoubleArrowRight } from 'react-icons/md';
import { BsListCheck } from 'react-icons/bs';
import { FaStickyNote } from 'react-icons/fa';
import { usePathname } from 'next/navigation';
import { Task } from '@prisma/client';
import clsx from 'clsx';
import Link from 'next/link';
import getTaskAmount from '@/app/lib/getTaskAmount';

const Tasks = ({ tasks }: { tasks: Task[] }) => {
  const pathname = usePathname().split('/').pop();
  const upcomingTasks = getTaskAmount(tasks, 'upcoming') || 0;
  const todayTasks = getTaskAmount(tasks, 'today');

  return (
    <section>
      <div className='flex flex-col py-4'>
        <h2 className='font-semibold mb-1'>Tasks</h2>
        <nav>
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
                {upcomingTasks}
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
                {todayTasks}
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
            </li>
          </ul>
        </nav>
      </div>
    </section>
  );
};

export default Tasks;
