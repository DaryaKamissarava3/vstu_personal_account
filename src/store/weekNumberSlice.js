import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchWeekNumber = createAsyncThunk(
  'weekNumber/fetchWeekNumber',
  async (_, {rejectWithValue, dispatch, getState}) => {
    try {
      const response = await axios.get('https://student.vstu.by/timetable/content/numberOfWeek');

      if (response.status !== 200) {
        throw new Error('Server error!');
      }

      const data = response.data;
      dispatch(getWeekNumber(data));
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
);

const initialState = {
  weekNumber: null,
  status: null,
  error: null,
};

const weekNumberSlice = createSlice({
  name: 'weekNumber',
  initialState,
  reducers: {
    getWeekNumber(state, action) {
      state.weekNumber = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeekNumber.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchWeekNumber.fulfilled, (state, action) => {
        state.status = 'resolved';
      })
      .addCase(fetchWeekNumber.rejected, (state, action) => {
        state.status = 'rejected';
      });
  }
});

const { getWeekNumber } = weekNumberSlice.actions;

export const weekNumberReducer = weekNumberSlice.reducer;
