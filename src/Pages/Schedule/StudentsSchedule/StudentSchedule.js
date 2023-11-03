import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Layout } from '../../../Layouts/Layout';
import { Table } from '../ScheduleComponents/Table';
import { Spinner } from '../../../components/Spinner';
import { ScheduleSelectors } from '../ScheduleComponents/ScheduleSelectors';
import { ErrorMessage } from '../../../components/ErrorMessage';

import { getCurrentDayOfWeek } from '../../../assets/utils/functions';

import { fetchWeekNumber } from '../../../store/weekNumberSlice';
import { fetchWeekName } from '../../../store/weekNameSlice';
import { fetchStudentsSchedule } from '../../../store/scheduleSlice';

export const StudentSchedule = () => {
  const dispatch = useDispatch();

  const scheduleArray = useSelector((state) => state.schedule.studentsScheduleData);
  const currentWeekNumber = useSelector((state) => state.weekNumber.weekNumber);
  const currentWeekName = useSelector((state) => state.weekName.weekName);
  const {studentsScheduleStatus, studentsScheduleError} = useSelector((state) => state.schedule);
  
  const [currentWeekDay, setCurrentWeekDay] = useState(getCurrentDayOfWeek());

  const [weekDay, setWeekDay] = useState(currentWeekDay);
  const [weekName, setWeekName] = useState(currentWeekName);
  const [weekNumber, setWeekNumber] = useState(currentWeekNumber);

  useEffect(() => {
    dispatch(fetchStudentsSchedule("Ит-10"));
    dispatch(fetchWeekNumber());
    dispatch(fetchWeekName());
  }, [dispatch]);

  return (
    <Layout>
      {studentsScheduleStatus === 'loading' && <Spinner type="points" text="Идёт загрузка"/>}
      {studentsScheduleError && <ErrorMessage error={studentsScheduleError}/>}
      {studentsScheduleStatus !== 'loading' && !studentsScheduleError && (
        <>
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
        </>)}
    </Layout>
  );
};
