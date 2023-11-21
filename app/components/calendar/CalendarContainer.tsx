'use client';

import getCurrentDate from '@/app/lib/getCurrentDate';
import getYearData from '@/app/lib/getYearData';
import { TaskWithList } from '@/typings';
import { useEffect, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import DayCard from './DayCard';
import { pusherClient } from '@/app/lib/pusher';

const CalendarContainer = ({ tasks }: { tasks: TaskWithList[] }) => {
  const { monthNumber, year } = getCurrentDate();
  const [currentYear, setCurrentYear] = useState(year);
  const [currentMonth, setCurrentMonth] = useState(monthNumber);
  const [yearData, setYearData] = useState(getYearData(currentYear, tasks));

  useEffect(() => {
    setYearData(getYearData(currentYear, tasks));
  }, [currentYear, tasks]);

  useEffect(() => {
    pusherClient.subscribe('delete-task');

    const taskHandler = (oldTask: TaskWithList) => {
      setYearData(
        getYearData(
          currentYear,
          tasks.filter((task) => task.id !== oldTask.id)
        )
      );
    };

    pusherClient.bind('task:delete', taskHandler);
    return () => {
      pusherClient.unsubscribe('delete-task');
      pusherClient.unbind('task:delete', taskHandler);
    };
  }, [yearData, currentYear, tasks]);

  return (
    <section className='overflow-auto'>
      <div className='w-full mb-4'>
        <div className='flex items-center justify-between text-lg'>
          <h3 className='text-2xl'>
            {yearData[currentMonth].name} {currentYear}
          </h3>
          <div>
            <button
              type='button'
              aria-label='Past year'
              className='px-2'
              onClick={() => {
                if (currentMonth > 0) {
                  setCurrentMonth((current) => current - 1);
                } else {
                  setCurrentMonth(11);
                  setCurrentYear((current) => current - 1);
                }
              }}>
              <FaChevronLeft />
            </button>
            <button
              type='button'
              aria-label='Next year'
              className='px-2'
              onClick={() => {
                if (currentMonth < 11) {
                  setCurrentMonth((current) => current + 1);
                } else {
                  setCurrentMonth(0);
                  setCurrentYear((current) => current + 1);
                }
              }}>
              <FaChevronRight />
            </button>
          </div>
        </div>
      </div>
      <ul className='w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7 gap-x-2 gap-y-3 h-full'>
        {yearData[currentMonth].days.map((day, index) => (
          <DayCard
            key={index}
            day={day}
          />
        ))}
      </ul>
    </section>
  );
};

export default CalendarContainer;
