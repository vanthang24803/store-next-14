export const handlerPercentChange = (data: any) => {
  const currentMonth = new Date().getMonth();
  const prevMonthDate = new Date();
  prevMonthDate.setMonth(currentMonth - 1);
  const prevMonth = prevMonthDate.getMonth();

  const currentValue = data[currentMonth].total;
  const preValue = data[prevMonth].total;

  const percentChange = ((currentValue - preValue) / preValue) * 100;

  return percentChange;
};
