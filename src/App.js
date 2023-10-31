import React from 'react';
import { Navigate, Route, Router, Routes } from 'react-router-dom';

import { StudentSchedule } from './Pages/Schedule/StudentsSchedule';
import { TeacherSchedule } from './Pages/Schedule/TeacherSchedule';
import { Login } from './Pages/Login';
import { Profile } from './Pages/Profile';
import { AuthProvider } from './hook/auth';
import { RequireAuth } from './hook/RequireAuth';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route
          path="/"
          element={
            <RequireAuth>
              <Profile/>
            </RequireAuth>
          }/>
        <Route path="/schedule" element={<RequireAuth><StudentSchedule/></RequireAuth>}/>
        <Route path="/schedule/teacher/:teacherName" element={<RequireAuth><TeacherSchedule/></RequireAuth>}/>
      </Routes>
    </AuthProvider>
  );
}

export default App;
