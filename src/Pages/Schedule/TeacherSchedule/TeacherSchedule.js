import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Layout } from '../../../Layouts/Layout';
import { Table } from '../ScheduleComponents/Table';
import { ScheduleSelectors } from '../ScheduleComponents/ScheduleSelectors';

import { getCurrentDayOfWeek } from '../../../assets/utils/functions';
import { fetchTeacherSchedule } from '../../../store/scheduleSlice';

import teacherImg from '../../../assets/images/avatar.svg';
import './style.css';

export const TeacherSchedule = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const scheduleArray = useSelector((state) => state.schedule.teacherScheduleData);

  const currentWeekNumber = useSelector((state) => state.weekNumber.weekNumber);
  const currentWeekName = useSelector((state) => state.weekName.weekName);
  const [currentWeekDay, setCurrentWeekDay] = useState(getCurrentDayOfWeek());

  const [weekDay, setWeekDay] = useState(currentWeekDay);
  const [weekName, setWeekName] = useState(currentWeekName);
  const [weekNumber, setWeekNumber] = useState(currentWeekNumber);

  useEffect(() => {
    dispatch(fetchTeacherSchedule('Карнилов Михаил Сергеевич'));
  }, [dispatch]);

  return (
    <Layout>
      <div className="teacher-information-block">
        <img className="teacher-block-img" src={teacherImg} alt="Teacher img"/>
        <div>
          <p>Иванов Иван Иванович</p>
          <p>кандидат технических наук, доцент</p>
        </div>
      </div>
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
        isTeacherSchedule={true}
      />
    </Layout>
  );
};
