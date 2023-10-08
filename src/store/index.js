import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import { scheduleReducer } from './scheduleSlice';
import { weekNumberReducer } from './weekNumberSlice';
import { weekNameReducer } from './weekNameSlice';

const rootReducer = combineReducers({
  schedule: scheduleReducer,
  weekNumber:weekNumberReducer,
  weekName:weekNameReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
