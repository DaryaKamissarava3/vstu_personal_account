import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';

import { scheduleReducer } from './scheduleSlice';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  schedule: scheduleReducer,
  //other
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
