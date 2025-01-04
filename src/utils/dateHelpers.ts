export const getPreviousPeriod = (day: string = "01") => {
  const date = new Date();
  const year = date.getFullYear();
  let month = date.getMonth() - 1;
  if (month < 0) {
    return `${date.getFullYear() - 1}-11-${day}`;
  }
  let formattedMonth = "";
  if (month + 1 < 10) {
    formattedMonth = `0${month + 1}`;
  }
  return `${year - 1}-${formattedMonth ?? month}-${day}`;
};

export const getCurrentPeriod = (day: string = "01") => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  let currentMonth = currentDate.getMonth();
  let formattedMonth = "";
  if (currentMonth + 1 < 10) {
    formattedMonth = `0${currentMonth + 1}`;
  }
  return `${currentYear}-${formattedMonth ?? currentMonth}-${day}`;
};
