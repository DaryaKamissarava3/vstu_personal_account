import {createBrowserRouter} from "react-router-dom";
import {RequireAuth} from "../hook/RequireAuth";
import {TeacherProfile} from "../Pages/TeacherProfile";
import {TeacherSchedule} from "../Pages/Schedule/TeacherSchedule";
import {StudentSchedule} from "../Pages/Schedule/StudentsSchedule";
import {Profile} from "../Pages/Profile";
import {Login} from "../Pages/Login";

const routes = createBrowserRouter([
  {
    path: '/login',
    element: <Login/>,
  },
  {
    path: '/',
    element: (
      <RequireAuth>
        <Profile/>
      </RequireAuth>
    ),
    children: [
      {
        path: "schedule",
        element: (
          <RequireAuth>
            <StudentSchedule/>
          </RequireAuth>
        ),
      },
    ],
  },
  {
    path: 'schedule/teacher/:teacherName',
    element: (
      <RequireAuth>
        <TeacherSchedule/>
      </RequireAuth>
    ),
  },
  {
    path: '/teacher-profile',
    element: (
      <RequireAuth>
        <TeacherProfile/>
      </RequireAuth>
    ),
  },
]);

export default routes;