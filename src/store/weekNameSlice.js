import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchWeekName = createAsyncThunk(
  'weekName/fetchWeekName',
  async (_, {rejectWithValue, dispatch}) => {
    try {
      const response = await axios.get('http://192.168.11.252:8082/timetable/content/nameOfWeek');

      if (response.status !== 200) {
        throw new Error('Server error!');
      }

      const data = response.data;
      dispatch(getWeekName(data));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  weekName: null,
  status: null,
  error: null,
};

const weekNameSlice = createSlice({
  name: 'weekName',
  initialState,
  reducers: {
    getWeekName(state, action) {
      state.weekName = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeekName.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchWeekName.fulfilled, (state, action) => {
        state.status = 'resolved';
      })
      .addCase(fetchWeekName.rejected, (state, action) => {
        state.status = 'rejected';
      })
  }
});

const { getWeekName } = weekNameSlice.actions;

export const weekNameReducer = weekNameSlice.reducer;
