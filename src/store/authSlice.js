import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const backendURL = 'https://ebook.vstu.by/authorization';

const userToken = localStorage.getItem('userToken') ? localStorage.getItem('userToken') : null;

export const userLogin = createAsyncThunk(
  'auth/userLogin',
  async ({username, password}, {rejectWithValue, dispatch}) => {
    try {
      const config = {
        headers: {
          'Content-type': "application/x-www-form-urlencoded",
          'Authorization':
            "Basic RElQTE9NQUZPUk1TOkRJUExPTUFGT1JNUw==",
        },
      };

      const {data} = await axios.post(
        `${backendURL}/token?grant_type=password`,
        {username, password},
        config
      );

      localStorage.setItem('userToken', data.access_token);
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)

const initialState = {
  loading: false,
  userInfo: null,
  userToken: null,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logoutUser(state) {
      localStorage.removeItem('userToken');
      state.userInfo = null;
      state.userToken = null;
      state.error = null;
      state.loading = false;
    }
  },
  extraReducers: (builder => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload
        state.userToken = action.payload.access_token;
        state.error = null;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  })
});

export const {loginUser, logoutUser} = authSlice.actions;

export const authReducer = authSlice.reducer;
