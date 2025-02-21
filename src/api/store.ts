import { appReducer, appSlice } from './appSlice';
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { planetsApi } from './planets/planetsApi';
import { baseApi } from './baseApi';
import { planetReducer, planetSlice } from './planets/planetSlice';

export const store = configureStore({
  reducer: {
    [appSlice.name]: appReducer,
    [planetSlice.name]: planetReducer,
    [planetsApi.reducerPath]: planetsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
