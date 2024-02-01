export const extractDayAndMonth = (dateStr: string) => {
  const date = new Date(dateStr);

  const day = date.getDate();

  const month = date.getMonth() + 1;

  return `${day.toString().padStart(2, '0')}.${month.toString().padStart(2, '0')}`;
};
