import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PlanetItem } from './planetsApi.types';

type PlanetState = {
  selectedPlanets: {
    [key: string]: PlanetItem;
  };
};

const initialState: PlanetState = {
  selectedPlanets: {},
};

export const planetSlice = createSlice({
  name: 'planet',
  initialState,
  reducers: {
    addPlanetToSelected: (
      state,
      action: PayloadAction<{ planet: PlanetItem }>
    ) => {
      const { planet } = action.payload;
      state.selectedPlanets[planet.name] = planet;
    },
    removePlanetFromSelected: (
      state,
      action: PayloadAction<{ name: string }>
    ) => {
      delete state.selectedPlanets[action.payload.name];
    },
    removeAllPlanetsFromSelected: (state) => {
      state.selectedPlanets = {};
    },
  },
});

export const {
  addPlanetToSelected,
  removePlanetFromSelected,
  removeAllPlanetsFromSelected,
} = planetSlice.actions;
export const planetReducer = planetSlice.reducer;
