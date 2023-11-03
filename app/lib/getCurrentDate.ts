const getCurrentDate = () => {
  let today: string | Date = new Date();
  let day: number | string = today.getDate();
  let tomorrowDay: number | string = today.getDate() + 1;
  let nextWeekDay: number | string = today.getDate() + 7;
  let month: number | string = today.getMonth() + 1;
  let year = today.getFullYear();

  if (day < 10) {
    day = '0' + day;
  }

  if (month < 10) {
    month = '0' + month;
  }

  if (tomorrowDay < 10) {
    tomorrowDay = '0' + tomorrowDay;
  }

  if (nextWeekDay < 10) {
    nextWeekDay = '0' + nextWeekDay;
  }

  today = year + '-' + month + '-' + day;
  const tomorrow = year + '-' + month + '-' + tomorrowDay;
  const todayNextWeek = year + '-' + month + '-' + nextWeekDay;

  return { today, tomorrow, todayNextWeek, day, month, year };
};

export default getCurrentDate;

// TODO WRITE CONDITION THAT UPDATES WHEN DATE + X = NEXT MONTH
