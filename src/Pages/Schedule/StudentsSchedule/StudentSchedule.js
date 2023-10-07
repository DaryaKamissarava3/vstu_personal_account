import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Layout } from '../../../Layouts/Layout';
import { Table } from '../ScheduleComponents/Table';
import { ScheduleSelectors } from '../ScheduleComponents/ScheduleSelectors';

import {
  studentsScheduleArray,
  weekNameFromDatabase,
  weekNumberFromDatabase
} from '../../../arrFromDatabase';

import { getCurrentDayOfWeek } from '../../../assets/utils/functions';
import {fetchStudentsSchedule, getStudentsSchedule, getWeekName, getWeekNumber} from '../../../store/scheduleSlice';

export const StudentSchedule = () => {
  const dispatch = useDispatch();

  const scheduleArray = useSelector((state) => state.schedule.studentsScheduleData);

  const currentWeekNumber = useSelector((state) => state.schedule.weekNumber);
  const currentWeekName = useSelector((state) => state.schedule.weekName);
  const [currentWeekDay, setCurrentWeekDay] = useState(getCurrentDayOfWeek());

  const [weekDay, setWeekDay] = useState(currentWeekDay);
  const [weekName, setWeekName] = useState(currentWeekName);
  const [weekNumber, setWeekNumber] = useState(currentWeekNumber);

  useEffect(() => {
    dispatch(fetchStudentsSchedule("Ит-11"));
    dispatch(getStudentsSchedule(studentsScheduleArray));
    dispatch(getWeekNumber(weekNumberFromDatabase));
    dispatch(getWeekName(weekNameFromDatabase));
  }, []);

  return (
    <Layout>
      <ScheduleSelectors
        updateWeekDay={setWeekDay}
        updateWeekName={setWeekName}
        updateWeekNumber={setWeekNumber}
      />
      <Table
        weekDay={weekDay}
        weekName={weekName}
        weekNumber={weekNumber}
        scheduleData={scheduleArray}
        isTeacherSchedule={false}
      />
    </Layout>
  );
};
