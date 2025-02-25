import { configureStore } from '@reduxjs/toolkit';
import { planetReducer } from './planetSlice';

export const makeStore = () =>
  configureStore({
    reducer: {
      planet: planetReducer,
    },
  });

export const store = makeStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
