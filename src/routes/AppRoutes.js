import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { Layout } from '../Layouts/Layout';
import { Profile } from '../Pages/Profile';
import { TeacherProfile } from '../Pages/TeacherProfile';
import { Login } from '../Pages/Login';
import { StudentSchedule } from '../Pages/Schedule/StudentsSchedule';
import { TeacherSchedule } from '../Pages/Schedule/TeacherSchedule';
import { Statistic } from '../Pages/Statistic';
import { ClassAttendance } from '../Pages/ClassAttendance';
import { UserManual } from '../Pages/UserManual';
import { ClassDebts } from '../Pages/ClassDebts';

export const AppRoutes = ({isAuthenticated, roles}) => {
  const [userRoleNumber, setUserRoleNumber] = useState(null);

  useEffect(() => {
    if (roles !== null) {
      const stateRole = roles.includes('USER') ? 1 : 0;
      if (stateRole === 0) {
        setUserRoleNumber(0);
      } else if (stateRole === 1) {
        setUserRoleNumber(1);
      }
    }
  }, [isAuthenticated, roles])

  return (
    <Routes>
      {!isAuthenticated ? (
        <>
          <Route path="/login" element={<Login/>}/>
          <Route path="*" element={<Navigate to="/login" replace={true}/>}/>
        </>
      ) : userRoleNumber === 0 ? (
        <>
          <Route path="/" element={<Layout role={userRoleNumber}/>}>
            <Route index element={<Profile/>}/>
            <Route path="/schedule" element={<StudentSchedule/>}/>
            <Route path="schedule/teacher/:teacherName" element={<TeacherSchedule/>}/>
            <Route path="/statistic" element={<Statistic/>}/>
            <Route path="/attendance" element={<ClassAttendance/>}/>
            <Route path="/debts" element={<ClassDebts/>}/>
            <Route path="/manual" element={<UserManual/>}/>
            <Route path="*" element={<Navigate to="/" replace={true}/>}/>
          </Route>
        </>
      ) : (
        <>
          <Route path="/" element={<Layout role={userRoleNumber}/>}>
            <Route index element={<TeacherProfile/>}/>
            <Route path="/schedule" element={<TeacherSchedule/>}/>
            <Route path="/manual" element={<UserManual/>}/>
            <Route path="*" element={<Navigate to="/teacher" replace={true}/>}/>
          </Route>
        </>
      )}
    </Routes>
  );
};
