import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

import { scheduleReducer } from './scheduleSlice';
import { weekNumberReducer } from './weekNumberSlice';
import { weekNameReducer } from './weekNameSlice';
import { authReducer } from './authSlice';
import { studentReducer } from './studentSlice';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  auth: authReducer,
  student:studentReducer,
  schedule: scheduleReducer,
  weekNumber: weekNumberReducer,
  weekName: weekNameReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      thunk: true
    }).concat(thunk),
});

export const persistor = persistStore(store);
