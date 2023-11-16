const getCurrentDate = () => {
  let today: string | Date = new Date();
  let day: string | number = today.getDate();
  let month: string | number = today.getMonth() + 1;
  const monthNumber = today.getMonth();
  const year = today.getFullYear();

  let tomorrow: string | Date = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  let tmrwDay: string | number = tomorrow.getDate();
  let tmrwMonth: string | number = tomorrow.getMonth() + 1;
  const tmrwYear = tomorrow.getFullYear();

  let todayNextWeek: string | Date = new Date(today);
  todayNextWeek.setDate(today.getDate() + 7);
  let nextWeekDay: string | number = todayNextWeek.getDate();
  let nextWeekMonth: string | number = todayNextWeek.getMonth() + 1;
  const nextWeekYear = todayNextWeek.getFullYear();

  if (day < 10) day = '0' + day;
  if (month < 10) month = '0' + month;
  if (tmrwDay < 10) tmrwDay = '0' + tmrwDay;
  if (tmrwMonth < 10) tmrwMonth = '0' + tmrwMonth;
  if (nextWeekDay < 10) nextWeekDay = '0' + nextWeekDay;
  if (nextWeekMonth < 10) nextWeekMonth = '0' + nextWeekMonth;

  today = year + '-' + month + '-' + day;
  tomorrow = tmrwYear + '-' + tmrwMonth + '-' + tmrwDay;
  todayNextWeek = nextWeekYear + '-' + nextWeekMonth + '-' + nextWeekDay;

  return { today, tomorrow, todayNextWeek, day, month, year, monthNumber };
};

export default getCurrentDate;
