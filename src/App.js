import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { Profile } from './Pages/Profile';
import { StudentSchedule } from "./Pages/Schedule/StudentsSchedule";
import { TeacherSchedule } from "./Pages/Schedule/TeacherSchedule";
import {Login} from './Pages/Login';

function App() {
  return (
    <Routes>
      <Route path="*" element={<Navigate to="/" replace={true}/>}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/" element={<Profile/>}/>
      <Route path="/schedule" element={<StudentSchedule/>}/>
      <Route path="/schedule/teacher/:teacherName" element={<TeacherSchedule/>}/>
    </Routes>
  );
}

export default App;
