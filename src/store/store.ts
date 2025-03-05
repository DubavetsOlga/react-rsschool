import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { planetReducer, planetSlice } from './planetSlice';

export const store = configureStore({
  reducer: {
    [planetSlice.name]: planetReducer,
  },
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
