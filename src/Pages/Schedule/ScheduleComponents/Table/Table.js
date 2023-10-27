import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {fetchTeacherSchedule} from '../../../../store/scheduleSlice';

import {
  lessonAbbreviations,
  lessonTime,
  russianToEnglishWeekdays,
  tableHeaderForStudents,
  tableHeaderForTeacher
} from '../../../../assets/utils/arrays';

import teacherImg from '../../../../assets/images/avatar.svg';
import './style.css';

export const Table = ({weekDay, weekName, weekNumber, scheduleData, isTeacherSchedule}) => {

  const [filteredSchedule, setFilteredSchedule] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (scheduleData) {
      setFilteredSchedule(filterSchedule(weekDay, weekNumber, weekName, scheduleData));
    }
  }, [weekDay, weekName, weekNumber, scheduleData]);


  const filterSchedule = (day, week, name, scheduleArray) => {
    const translateDayFromSelect = matchDayOfWeek(day);
    const filteredArray = scheduleArray.filter(item => {
      if (week === 'все') {
        return (item.lessonDay === translateDayFromSelect);
      } else {
        return (
          item.lessonDay === translateDayFromSelect &&
          (item.weekNumber === null || item.weekNumber === week) &&
          (item.numerator === null ||
            (name === true ? item.numerator === true : item.numerator === false))
        );
      }
    }).slice().sort((a, b) => a.lessonNumber - b.lessonNumber);
    return filteredArray;
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

  const matchLessonTypeAbbreviation = (typeClassName) => {
    const match = lessonAbbreviations.find((item) => item.typeClassName === typeClassName);
    return match ? match.abbreviation : '';
  };

  const matchLessonTime = (lessonNumber) => {
    const match = lessonTime.find((item) => item.lessonNumber === lessonNumber);
    return match ? match.lessonTime : '';
  }

  const matchDayOfWeek = (lessonDay) => {
    const match = russianToEnglishWeekdays.find((item) => item.dayInRussian === lessonDay);
    return match ? match.dayInEnglish : '';
  }

  const shortenDisciplineName = (fullName) => {
    const splitName = fullName.split(" ");
    return splitName.map((word) => word.charAt(0).toUpperCase()).join("");
  }

  const shortenTeacherName = (fullName) => {
    const splitName = fullName.split(' ');
    const lastName = splitName[0];
    const firstName = splitName[1].charAt(0);
    const fatherName = splitName[2].charAt(0);

    return `${lastName} ${firstName}.${fatherName}.`
  };

  const handleTeacherScheduleNavigate = (teacherFio) => {
    dispatch(fetchTeacherSchedule("'" + teacherFio + "'"))
    // dispatch(fetchTeacherSchedule(teacherFio))
  }

  return (
    <>
      <div className="schedule-table-block">
        <table className="schedule-table">
          <thead className="table-header">
          <tr className="table-header_row">
            {isTeacherSchedule ?
              tableHeaderForTeacher.map((name, index) => (
                <th className="table-header_item" key={index}>
                  {name}
                </th>
              ))
              : tableHeaderForStudents.map((name, index) => (
                <th className="table-header_item" key={index}>
                  {name}
                </th>
              ))
            }
          </tr>
          </thead>
          <tbody>
          {filteredSchedule.length === 0 ? (
            <tr>
              <td colSpan="7" className="table-body_row_item no_lessons">Пары отсутствуют</td>
            </tr>
          ) : (
            filteredSchedule.map((tableItem) => (
              <tr className="table-body_row" key={tableItem.id}>
                <td className={`table-body_row_item lesson_number ${generateClassName(tableItem.typeClassName)}`}>
                  {tableItem.lessonNumber}
                </td>
                <td className="table-body_row_item">{matchLessonTime(tableItem.lessonNumber)}</td>
                <td className="table-body_row_item">{matchLessonTypeAbbreviation(tableItem.typeClassName)}</td>
                <td className="table-body_row_item">{tableItem.disciplineName}</td>
                {tableItem.subGroup === 1 || tableItem.subGroup === 2 ? (
                  <td className="table-body_row_item">{tableItem.subGroup}п.</td>
                ) : (
                  <td className="table-body_row_item"></td>
                )}
                <td className="table-body_row_item">{tableItem.frame}-{tableItem.location}</td>
                {isTeacherSchedule ?
                  <td className="table-body_row_item">
                    {tableItem.groupName}
                  </td>
                  :
                  <td className="table-body_row_item teacher_cell">
                    <Link
                      to={`/schedule/teacher/${tableItem.teacherFio}`}
                      className="teacher_link"
                      onClick={() => handleTeacherScheduleNavigate(tableItem.teacherFio)}
                    >
                      <img className="teacher_cell_img" src={teacherImg} alt="Teacher image"/>
                      {shortenTeacherName(tableItem.teacherFio)}
                    </Link>
                  </td>
                }
              </tr>
            ))
          )}
          </tbody>
        </table>
      </div>
      <div className="schedule-table_mobile">
        <div className="mobile-table-container">
          <div className="mobile-table-header">{weekDay}</div>
          {filteredSchedule.length === 0 ? (
            <div className="mobile-table-block">
              <h3 className="block_no_lessons">Пары отсутствуют</h3>
            </div>
          ) : (
            filteredSchedule.map((item) => (
              <div className={`mobile-table-block ${generateClassName(item.typeClassName)}`} key={item.id}>
                <div className="table-block_inner">
                  <div className="block_inner_description">
                    <div className="block_description_name">
                      <h4 className="description_lesson_name">{shortenDisciplineName(item.disciplineName)}</h4>
                      <p className="description_lesson_type">({matchLessonTypeAbbreviation(item.typeClassName)})</p>
                      {item.subGroup === 1 || item.subGroup === 2 ? (
                        <p className="description_lesson_subGroup">{item.subGroup}п.</p>
                      ) : (
                        <p className="description_lesson_subGroup"></p>
                      )}
                    </div>
                    <p className="description_lesson_time">Время: {matchLessonTime(item.lessonNumber)}</p>
                    <p className="description_lesson_location">{item.frame}-{item.location} ауд.</p>
                  </div>
                  {isTeacherSchedule ?
                    <div>
                      {item.groupName}
                    </div>
                    :
                    <Link to={`/schedule/teacher/${item.teacherFio}`} className="block_teacher_information">
                      <img className="teacher_cell_img mobile" src={teacherImg} alt="Teacher image"/>
                      <p className="block_teacher_name">{shortenTeacherName(item.teacherFio)}</p>
                    </Link>
                  }
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};
