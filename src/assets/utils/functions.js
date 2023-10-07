export const getCurrentDayOfWeek = () => {
  const daysOfWeek = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
  const today = new Date();
  const dayOfWeek = today.getDay();
  return daysOfWeek[dayOfWeek];
};