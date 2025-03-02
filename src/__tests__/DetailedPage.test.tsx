import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import DetailedPage from '../app/detailed/page';
import { fetchData } from '../common/utils';
import { Theme } from '../common/context/Theme';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { planetReducer } from '../common/store/planetSlice';
import {
  useAppDispatch,
  useAppSelector,
  useInitializeSearchParams,
} from '../common/hooks';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { use } from 'react';

jest.mock('../common/utils', () => ({
  fetchData: jest.fn(),
}));

jest.mock('../common/hooks', () => ({
  useAppSelector: jest.fn(),
  useAppDispatch: jest.fn(),
  useInitializeSearchParams: jest.fn(),
}));

const store = configureStore({
  reducer: planetReducer,
});

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
  usePathname: jest.fn(),
  redirect: jest.fn(),
}));

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  use: jest.fn(),
}));

describe('DetailedPage', () => {
  const mockDispatch = jest.fn();
  const mockUseAppSelector = useAppSelector as jest.Mock;
  const mockUseAppDispatch = useAppDispatch as unknown as jest.Mock;
  const mockSearchParams = new URLSearchParams();

  beforeEach(() => {
    jest.clearAllMocks();
    (usePathname as jest.Mock).mockReturnValue('/');
    (useSearchParams as jest.Mock).mockReturnValue(mockSearchParams);

    mockUseAppSelector.mockReturnValue({
      selectedPlanets: {
        Tatooine: {
          name: 'Tatooine',
          rotation_period: '24',
          orbital_period: '365',
          diameter: '12742',
          climate: 'arid',
          gravity: '1',
          terrain: 'desert',
          surface_water: '1',
          population: '200000',
          residents: ['Luke Skywalker'],
          films: ['A New Hope'],
          created: '2023-02-06',
          edited: '2023-02-06',
          url: 'https://swapi.dev/api/planets/1/',
        },
      },
    });

    mockUseAppDispatch.mockReturnValue(mockDispatch);
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
      query: {},
    });

    (useInitializeSearchParams as jest.Mock).mockImplementation(() =>
      jest.fn()
    );
  });

  it('fetches planet data and renders it when valid detail ID is passed', async () => {
    const searchParams = { detail: '1' };
    const mockPlanetData = { name: 'Tatooine', climate: 'arid' };

    (fetchData as jest.Mock).mockResolvedValue(mockPlanetData);
    (use as jest.Mock).mockReturnValue(mockPlanetData);

    const Page = await DetailedPage({ searchParams });

    render(
      <Theme>
        <Provider store={store}>{Page}</Provider>
      </Theme>
    );

    await waitFor(() => screen.getByText('Name: Tatooine'));

    expect(screen.getByText('Name: Tatooine')).toBeInTheDocument();
    expect(screen.getByText('Climate: arid')).toBeInTheDocument();
  });
});
