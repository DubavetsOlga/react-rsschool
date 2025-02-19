import { PlanetItem, ResponseType } from './planetsApi.types.ts';
import { baseApi } from '../baseApi.ts';

export const planetsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getPlanets: build.query<
      ResponseType,
      { page: string; searchValue: string }
    >({
      query: ({ page, searchValue }) => {
        return {
          method: 'GET',
          url: `planets/?search=${encodeURIComponent(searchValue.trim())}&page=${page}`,
        };
      },
    }),
    getPlanetById: build.query<PlanetItem, { planetId: string }>({
      query: ({ planetId }) => {
        return {
          method: 'GET',
          url: `planets/${planetId}`,
        };
      },
    }),
  }),
});

export const { useGetPlanetsQuery, useGetPlanetByIdQuery } = planetsApi;
