import {Route, Routes} from 'react-router-dom';
import {TeacherProfile} from '../Pages/TeacherProfile';
import {Profile} from '../Pages/Profile';
import {Login} from '../Pages/Login';
import {PrivateRoutes} from './PrivateRoutes';
import {StudentSchedule} from '../Pages/Schedule/StudentsSchedule';
import {TeacherSchedule} from '../Pages/Schedule/TeacherSchedule';
import {Statistic} from '../Pages/Statistic';
import {ClassDebts} from '../Pages/ClassDebts';
import {UserManual} from '../Pages/UserManual';
import {ClassAttendance} from '../Pages/ClassAttendance';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="login" element={<Login/>}/>
      <Route path="/" element={<PrivateRoutes role="STUDENT"/>}>
        <Route index element={<Profile/>}/>
        <Route path="schedule" element={<StudentSchedule/>}/>
        <Route path="schedule/teacher/:teacherName" element={<TeacherSchedule/>}/>
        <Route path="statistic" element={<Statistic/>}/>
        <Route path="attendance" element={<ClassAttendance/>}/>
        <Route path="debts" element={<ClassDebts/>}/>
        <Route path="manual" element={<UserManual/>}/>
      </Route>
      <Route path="/teacher" element={<PrivateRoutes role="USER"/>}>
        <Route index element={<TeacherProfile/>}/>
      </Route>
    </Routes>
  );
};
