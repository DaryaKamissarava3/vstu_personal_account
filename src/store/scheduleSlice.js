import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchStudentsSchedule = createAsyncThunk(
  `schedule/fetchStudentsSchedule`,
  async (group, {rejectWithValue, dispatch}) => {
    try {
      const response = await axios.get(`http://192.168.11.252:8082/timetable/patterns/search?q=groupName==${group}`);

      if (response.status !== 200) {
        throw new Error('Server error!')
      }

      const data = response.data;
      dispatch(getStudentsSchedule(data));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchTeacherSchedule = createAsyncThunk(
  `schedule/fetchTeacherSchedule`,
  async (teacherFio, {rejectWithValue, dispatch}) => {
    try {
      const response = await axios.get(`http://192.168.11.252:8082/timetable/patterns/search?q=teacherFio==${teacherFio}`);

      if (response.status !== 200) {
        throw new Error('Server error!')
      }

      const data = response.data;
      dispatch(getTeacherSchedule(data));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  studentsScheduleData: [],
  teacherScheduleData: [],
  studentsScheduleStatus: null,
  teacherScheduleStatus: null,
  studentsScheduleError: null,
  teacherScheduleError: null,
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
  },
  extraReducers: (builder => {
    builder
      .addCase(fetchStudentsSchedule.pending, (state) => {
        state.studentsScheduleStatus = 'loading';
        state.studentsScheduleError = null;
      })
      .addCase(fetchStudentsSchedule.fulfilled, (state, action) => {
        state.studentsScheduleStatus = 'resolved';
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
      })
      .addCase(fetchTeacherSchedule.rejected, (state, action) => {
        state.teacherScheduleStatus = 'rejected';
      })
  })
})

const { getStudentsSchedule, getTeacherSchedule } = scheduleSlice.actions;

export const scheduleReducer = scheduleSlice.reducer;
