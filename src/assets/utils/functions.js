export const getCurrentDayOfWeek = () => {
  const daysOfWeek = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
  const today = new Date();
  const dayOfWeek = today.getDay();
  return daysOfWeek[dayOfWeek];
};

export const shortenName = (fullName) => {
  const splitName = fullName.split(' ');
  const lastName = splitName[0];
  const firstName = splitName[1].charAt(0);
  const fatherName = splitName[2].charAt(0);

  return `${lastName} ${firstName}.${fatherName}.`
};