import { Day, Month, TaskWithList } from '@/typings';

const getYearData = (year: number, tasks: TaskWithList[]) => {
  const yearData: Month[] = [];

  for (let i = 1; i <= 12; i++) {
    const date = new Date(year, i, 0);
    const monthName = date.toLocaleString('en-us', { month: 'long' });
    const dayCount = new Date(year, i, 0).getDate();
    const days: Day[] = [];

    for (let j = 1; j <= dayCount; j++) {
      const day = { number: j, tasks: [] as TaskWithList[] };

      tasks.forEach((task) => {
        if (!task.date) return;
        const dayDate = j < 10 ? '0' + j : j;
        const monthDate = i < 10 ? '0' + i : i;
        if (task.date === year + '-' + monthDate + '-' + dayDate) {
          day.tasks.push(task);
        }
      });

      days.push(day);
    }

    yearData.push({ name: monthName, days });
  }

  return yearData;
};

export default getYearData;
