import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { StudentSchedule } from '../../Pages/Schedule/StudentsSchedule';
import { TeacherSchedule } from '../../Pages/Schedule/TeacherSchedule';

const Router = () => {
  return (
    <Routes>
      <Route path="*" element={<Navigate to="/schedule" replace={true}/>}/>
      <Route path="/schedule" element={<StudentSchedule />}/>
      <Route path="/schedule/teacher/:id" element={<TeacherSchedule />}/>
    </Routes>
  );
};

export default Router;