import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { CustomSelect } from '../../../../components/CustomSelect';

import { getCurrentDayOfWeek } from '../../../../assets/utils/functions';

import './style.css';

const dayOptions = [
  {value: 'Понедельник', label: 'Понедельник'},
  {value: 'Вторник', label: 'Вторник'},
  {value: 'Среда', label: 'Среда'},
  {value: 'Четверг', label: 'Четверг'},
  {value: 'Пятница', label: 'Пятница'},
  {value: 'Суббота', label: 'Суббота'},
];

const weekNumberOptions = [
  {value: 1, label: 1},
  {value: 2, label: 2},
  {value: 3, label: 3},
  {value: 4, label: 4},
  {value:'все',label:'все'}
];

export const ScheduleSelectors = ({updateWeekDay, updateWeekName, updateWeekNumber}) => {
  const currentWeekNumber = useSelector((state) => state.weekNumber.weekNumber);
  const currentWeekName = useSelector((state) => state.weekName.weekName);

  const [currentWeekDay, setCurrentWeekDay] = useState(getCurrentDayOfWeek());
  const [selectedWeekNumber, setSelectedWeekNumber] = useState(currentWeekNumber);

  const [isCheckedNumerator, setIsCheckedNumerator] = useState(false);
  const [isCheckedDenominator, setIsCheckedDenominator] = useState(false);

  useEffect(() => {
    if (currentWeekName === true) {
      setIsCheckedNumerator(true);
      setIsCheckedDenominator(false);
    } else {
      setIsCheckedNumerator(false);
      setIsCheckedDenominator(true);
    }
  }, [currentWeekName]);

  const handleWeekDayChange = (selectedOption) => {
    setCurrentWeekDay(selectedOption.value);
    updateWeekDay(selectedOption.value);
  };

  const handleWeekNumberChange = (selectedOption) => {
    setSelectedWeekNumber(selectedOption.value);
    updateWeekNumber(selectedOption.value);
  };

  const handleCheckboxNumerator = () => {
    setIsCheckedNumerator(true);
    setIsCheckedDenominator(false);
    updateWeekName(true);
  }

  const handleCheckboxDenominator = () => {
    setIsCheckedNumerator(false);
    setIsCheckedDenominator(true);
    updateWeekName(false);
  }

  return (
    <div className="schedule-selectors-container">
      <CustomSelect
        options={dayOptions}
        value={{value: currentWeekDay, label: currentWeekDay}}
        onChange={handleWeekDayChange}
        label="Выберите день недели"
      />
      <CustomSelect
        options={weekNumberOptions}
        value={{value: selectedWeekNumber, label: selectedWeekNumber}}
        onChange={handleWeekNumberChange}
        label="Выберите неделю"
      />
      <div className="checkbox-container">
        <label className="checkbox-label_1">
          Числитель/
        </label>
        <input
          className="schedule-checkbox"
          type="checkbox"
          checked={isCheckedNumerator}
          onChange={handleCheckboxNumerator}
        />
        <label className="checkbox-label_2">
          Знаменатель
        </label>
        <input
          className="schedule-checkbox"
          type="checkbox"
          checked={isCheckedDenominator}
          onChange={handleCheckboxDenominator}
        />
      </div>
    </div>
  );
};
