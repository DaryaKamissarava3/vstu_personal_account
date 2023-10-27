import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const backendURL = 'https://ebook.vstu.by/authorization';

const userToken = localStorage.getItem('userToken') ? localStorage.getItem('userToken') : null;

export const userLogin = createAsyncThunk(
  'auth/userLogin',
  async ({username, password}, {rejectWithValue}) => {
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

      localStorage.setItem('userToken', data.userToken);
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
  userInfo: {},
  userToken: null,
  error: null,
  success: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginUser(state, action) {
      console.log(action.payload)
      state.userInfo = action.payload;
      state.userToken = action.payload.userToken;
    },
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
      .addCase(userLogin.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(userLogin.rejected, (state, {payload}) => {
        state.loading = false;
        state.error = payload;
      })
  })
});

export const authReducer = authSlice.reducer;
