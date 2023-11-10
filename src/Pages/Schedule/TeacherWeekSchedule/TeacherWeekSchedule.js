import React, {useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTeacherWeekSchedule } from '../../../store/scheduleSlice';

import {
  lessonAbbreviations,
  lessonTime,
  russianToEnglishWeekdays,
  tableHeaderForWeek
} from '../../../assets/utils/arrays';

import './style.css';

export const TeacherWeekSchedule = () => {
  const dispatch = useDispatch();

  const userToken = useSelector((state) => state.auth.userToken);
  const teacherSchedule = useSelector((state) => state.schedule.teacherWeekScheduleData);

  const [filteredSchedule, setFilteredSchedule] = useState([]);
  console.log(teacherSchedule);

  useEffect(() => {
    dispatch(fetchTeacherWeekSchedule(userToken));
  }, [dispatch, userToken]);

  const filterArray = (teacherSchedule) => {
    const filteredLessons = teacherSchedule
      .filter((item) => {
        const lessonDay = matchDayOfWeek(item.lessonDay);
        return lessonDay !== '';
      });

    return filteredLessons.sort((a, b) => {
      const weekdays = russianToEnglishWeekdays.map((item) => item.dayInEnglish);
      return weekdays.indexOf(a.lessonDay) - weekdays.indexOf(b.lessonDay);
    });
  };

  const generateClassName = (typeClassName) => {
    switch (typeClassName) {
      case 'Лекция':
        return 'lecture_row';
      case 'Лабораторная работа':
        return 'lab_work_row';
      case 'Практическая работа':
        return 'practice_row';
    }
  };

  const matchDayOfWeek = (lessonDay) => {
    const match = russianToEnglishWeekdays.find((item) => item.dayInRussian === lessonDay);
    return match ? match.dayInEnglish : '';
  }

  const matchLessonTypeAbbreviation = (typeClassName) => {
    const match = lessonAbbreviations.find((item) => item.typeClassName === typeClassName);
    return match ? match.abbreviation : '';
  };

  const matchLessonTime = (lessonNumber) => {
    const match = lessonTime.find((item) => item.lessonNumber === lessonNumber);
    return match ? match.lessonTime : '';
  }

  return (
    <>
      <h2>schedule</h2>
      <div className="schedule-table-block">
        <table className="schedule-table">
          <thead className="table-header">
          <tr className="table-header_row">
            {
              tableHeaderForWeek.map((name, index) => (
                <th className="table-header_item" key={index}>
                  {name}
                </th>
              ))
            }
          </tr>
          </thead>
          <tbody>
          {
            teacherSchedule.map((tableItem) => (
              <tr className="table-body_row" key={tableItem.id}>

                <td className={`table-body_row_item lesson_number ${generateClassName(tableItem.typeClassName)}`}>
                  {tableItem.lessonNumber}
                </td>
                <td className="table-body_row_item">{tableItem.lessonDay}</td>
                <td className="table-body_row_item">{matchLessonTime(tableItem.lessonNumber)}</td>
                <td className="table-body_row_item">{matchLessonTypeAbbreviation(tableItem.typeClassName)}</td>
                <td className="table-body_row_item">{tableItem.disciplineName}</td>
                {tableItem.subGroup === 1 || tableItem.subGroup === 2 ? (
                  <td className="table-body_row_item">{tableItem.subGroup}п.</td>
                ) : (
                  <td className="table-body_row_item"></td>
                )}
                <td className="table-body_row_item">{tableItem.frame}-{tableItem.location}</td>
                {
                  <td className="table-body_row_item">
                    {tableItem.groupName}
                  </td>
                }
              </tr>
            ))
          }
          </tbody>
        </table>
      </div>
    </>
  );
};