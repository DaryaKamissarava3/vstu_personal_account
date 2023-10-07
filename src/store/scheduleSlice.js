import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchStudentsSchedule=createAsyncThunk(
  `schedule/fetchStudentsSchedule`,
  async(group)=>{
    const response=await axios.get(`http://192.168.11.252:8082/timetable/patterns/search?q=groupName==${group}`);
    return response.data;
  }
);

export const fetchTeacherSchedule=createAsyncThunk(
  `schedule/fetchTeacherSchedule`,
  async(teacherFio)=>{
    const response=await axios.get(`http://192.168.11.252:8082/timetable/patterns/search?q=teacherFio==${teacherFio}`);
    return response.data;
  }
);

const initialState = {
  studentsScheduleData: [],
  teacherScheduleData: [],
  weekName: null,
  weekNumber: null,
};

const scheduleSlice = createSlice({
  name: 'schedule',
  initialState,
  reducers: {
    getStudentsSchedule(state, action) {
      state.studentsScheduleData = action.payload;
    },
    getTeacherSchedule(state, action) {
      state.teacherScheduleData = action.payload;
    },
    getWeekNumber(state, action) {
      state.weekNumber = action.payload;
    },
    getWeekName(state, action) {
      state.weekName = action.payload;
    },
  }
})

export const {
  getStudentsSchedule,
  getTeacherSchedule,
  getWeekNumber,
  getWeekName
} = scheduleSlice.actions;

export const scheduleReducer= scheduleSlice.reducer;