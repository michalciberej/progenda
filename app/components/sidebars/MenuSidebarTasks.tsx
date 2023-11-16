'use client';

import { MdKeyboardDoubleArrowRight } from 'react-icons/md';
import { BsListCheck } from 'react-icons/bs';
import { usePathname } from 'next/navigation';
import { MdOutlineEditNote } from 'react-icons/md';
import { IoCalendarOutline } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import { TaskWithList } from '@/typings';
import { pusherClient } from '@/app/lib/pusher';
import clsx from 'clsx';
import Link from 'next/link';
import getCurrentDate from '@/app/lib/getCurrentDate';

const MobileSidebar = ({
  tasks,
  isMenuOpened,
}: {
  tasks: TaskWithList[];
  isMenuOpened: boolean;
}) => {
  const pathname = usePathname().split('/').pop();
  const { today } = getCurrentDate();
  const [upcomingTasks, setUpcomingTasks] = useState<TaskWithList[]>([]);
  const [todayTasks, setTodayTasks] = useState<TaskWithList[]>();
  const hiddenOrShown = isMenuOpened ? 'block' : 'hidden';
  const center = isMenuOpened ? 'justify-between' : 'justify-center';

  useEffect(() => {
    setUpcomingTasks(tasks.filter((task) => task.date !== today));
    setTodayTasks(tasks.filter((task) => task.date === today));
  }, [tasks, today]);

  useEffect(() => {
    pusherClient.subscribe('new-task');

    const taskHandler = (task: TaskWithList) => {
      if (task.date === today) {
        setTodayTasks(todayTasks?.concat(task));
      } else setUpcomingTasks(upcomingTasks.concat(task));
    };

    pusherClient.bind('task:new', taskHandler);
    return () => {
      pusherClient.unsubscribe('new-task');
      pusherClient.unbind('task:new', taskHandler);
    };
  }, [todayTasks, upcomingTasks, today]);

  useEffect(() => {
    pusherClient.subscribe('delete-task');

    const taskHandler = (oldTask: TaskWithList) => {
      if (oldTask.date === today) {
        setTodayTasks(todayTasks?.filter((task) => task.id !== oldTask.id));
      } else
        setUpcomingTasks(
          upcomingTasks.filter((task) => task.id !== oldTask.id)
        );
    };

    pusherClient.bind('task:delete', taskHandler);
    return () => {
      pusherClient.unsubscribe('delete-task');
      pusherClient.unbind('task:delete', taskHandler);
    };
  }, [todayTasks, upcomingTasks, today]);

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
                aria-label='Upcoming'
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
                {upcomingTasks.length}
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
                aria-label='Today'
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
                {todayTasks?.length}
              </span>
            </li>
            <li
              className={clsx(
                `flex items-center rounded-lg py-2 px-2`,
                pathname === 'sticky-wall' && 'bg-background_DM/20',
                center
              )}>
              <Link
                href={'/user/sticky-wall'}
                aria-label='Today'
                className={`flex items-center gap-2 ${
                  pathname === 'sticky-wall' && 'font-semibold'
                }`}>
                <MdOutlineEditNote className='text-xl' />
                <span className={hiddenOrShown}>Sticky Wall</span>
              </Link>
            </li>
            <li
              className={clsx(
                `flex items-center rounded-lg py-2 px-2`,
                pathname === 'calendar' && 'bg-background_DM/20',
                center
              )}>
              <Link
                href={'/user/calendar'}
                aria-label='Today'
                className={`flex items-center gap-2 ${
                  pathname === 'calendar' && 'font-semibold'
                }`}>
                <IoCalendarOutline className='text-xl' />
                <span className={hiddenOrShown}>Calendar</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </section>
  );
};

export default MobileSidebar;
