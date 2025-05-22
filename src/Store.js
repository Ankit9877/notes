import { configureStore } from '@reduxjs/toolkit';
import noteReducer from './Redux/noteSlice';

export const store = configureStore({
  reducer: {
    note: noteReducer,
  },
});
