import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchStudentsSchedule = createAsyncThunk(
  `schedule/fetchStudentsSchedule`,
  async (group, {rejectWithValue, dispatch}) => {
    try {
      const response = await axios.get(`https://student.vstu.by/timetable/patterns/search?q=groupName==${group}`);

      if (response.status !== 200) {
        throw new Error('Server error!')
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchTeacherSchedule = createAsyncThunk(
  `schedule/fetchTeacherSchedule`,
  async (teacherFio, {rejectWithValue, dispatch}) => {
    try {
      const response = await axios.get(`https://student.vstu.by/timetable/patterns/search?q=teacherFio==${teacherFio}`);

      if (response.status !== 200) {
        throw new Error('Server error!')
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchTeacherWeekSchedule = createAsyncThunk(
  `schedule/fetchTeacherWeekSchedule`,
  async (token, {rejectWithValue, dispatch}) => {
    try {
      const config = {
        headers: {
          'Content-type': "application/x-www-form-urlencoded",
          'Authorization': `Bearer ${token}`,
        },
      };

      const {data} = await axios.get(
        'https://student.vstu.by/api/schedules/teacher',
        config
      );

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  studentsScheduleData: [],
  teacherScheduleData: [],
  teacherWeekScheduleData: [],

  studentsScheduleStatus: null,
  teacherScheduleStatus: null,
  teacherWeekScheduleStatus: null,

  studentsScheduleError: null,
  teacherScheduleError: null,
  teacherWeekScheduleError: null,
};

const scheduleSlice = createSlice({
  name: 'schedule',
  initialState,
  reducers: {
    clearSchedule(state) {
      state.studentsScheduleData = [];
      state.studentsScheduleStatus = null;
      state.teacherScheduleData = [];
      state.teacherScheduleStatus = null;
    },
  },
  extraReducers: (builder => {
    builder
      .addCase(fetchStudentsSchedule.pending, (state) => {
        state.studentsScheduleStatus = 'loading';
        state.studentsScheduleError = null;
      })
      .addCase(fetchStudentsSchedule.fulfilled, (state, action) => {
        state.studentsScheduleStatus = 'resolved';
        state.studentsScheduleData = action.payload;
      })
      .addCase(fetchStudentsSchedule.rejected, (state, action) => {
        state.studentsScheduleStatus = 'rejected';
      })
      .addCase(fetchTeacherSchedule.pending, (state) => {
        state.teacherScheduleStatus = 'loading';
        state.teacherScheduleError = null;
      })
      .addCase(fetchTeacherSchedule.fulfilled, (state, action) => {
        state.teacherScheduleStatus = 'resolved';
        state.teacherScheduleData = action.payload;
      })
      .addCase(fetchTeacherSchedule.rejected, (state, action) => {
        state.teacherScheduleStatus = 'rejected';
      })
      .addCase(fetchTeacherWeekSchedule.pending, (state) => {
        state.teacherWeekScheduleStatus = 'loading';
      })
      .addCase(fetchTeacherWeekSchedule.fulfilled, (state, action) => {
        state.teacherWeekScheduleStatus = 'resolved';
        state.teacherWeekScheduleData = action.payload;
      })
      .addCase(fetchTeacherWeekSchedule.rejected, (state, action) => {
        state.teacherWeekScheduleStatus = 'rejected';
      })
  })
});

export const { clearSchedule } = scheduleSlice.actions;

export const scheduleReducer = scheduleSlice.reducer;
