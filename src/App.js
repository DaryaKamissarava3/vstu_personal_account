import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { ClassAttendance } from './Pages/ClassAttendance';
import { ClassDebts } from './Pages/ClassDebts';
import { Login } from './Pages/Login';
import { Profile } from './Pages/Profile';
import { UserManual } from './Pages/UserManual';
import { Statistic } from './Pages/Statistic';
import { StudentSchedule } from './Pages/Schedule/StudentsSchedule';
import { TeacherProfile } from './Pages/TeacherProfile';
import { TeacherSchedule } from './Pages/Schedule/TeacherSchedule';

import { AuthProvider } from './hook/auth';
import { RequireAuth } from './hook/RequireAuth';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />}/>
        <Route path="/" element={<RequireAuth><Profile /></RequireAuth>} />
        <Route path="/schedule" element={<StudentSchedule />}/>
        <Route path="/schedule/teacher/:teacherName" element={<TeacherSchedule />}/>
        <Route path="/statistic" element={<Statistic />}/>
        <Route path="/attendance" element={<ClassAttendance />}/>
        <Route path="/debts" element={<ClassDebts />}/>
        <Route path="/manual" element={<UserManual />}/>
        <Route path="/teacher-profile" element={<RequireAuth><TeacherProfile /></RequireAuth>} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
