const getCurrentDate = () => {
  let today: string | Date = new Date();
  let day: number | string = today.getDate();
  let month: number | string = today.getMonth() + 1;
  let year = today.getFullYear();

  if (day < 10) {
    day = '0' + day;
  }
  if (month < 10) {
    month = '0' + month;
  }
  today = year + '-' + month + '-' + day;

  return { today, day, month, year };
};

export default getCurrentDate;
