import React from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';

import {Profile} from './Pages/Profile';
import {StudentSchedule} from './Pages/Schedule/StudentsSchedule';
import {TeacherSchedule} from './Pages/Schedule/TeacherSchedule';
import {Login} from './Pages/Login';
import {useSelector} from "react-redux";

function App() {
  const loggedOut = useSelector((state) => state.auth.success !== true);
  return (
    <Routes>
      {loggedOut ? (
          <>
            <Route path="/login" element={<Login />}/>
            <Route path="*" element={<Navigate to="/login" replace={true}/>}/>
          </>
        ) :(
        <>
          <Route path="/" element={<Profile/>}/>
          <Route path="/schedule" element={<StudentSchedule/>}/>
          <Route path="/schedule/teacher/:teacherName" element={<TeacherSchedule/>}/>
          <Route path="*" element={<Navigate to="/" replace={true}/>}/>
        </>
        )
      }
    </Routes>
  );
}

export default App;
