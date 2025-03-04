import { render, screen, waitFor } from '@testing-library/react';
import { use } from 'react';
import { fetchData } from '../common/utils';
import { CardListWrapper } from '../components/cardList/CardListWrapper';
import { ResponseType } from '../common/types';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { configureStore } from '@reduxjs/toolkit';
import { planetReducer } from '../common/store/planetSlice';
import { Provider } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../common/hooks';
import '@testing-library/jest-dom';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
  usePathname: jest.fn(),
}));

jest.mock('../common/utils', () => ({
  fetchData: jest.fn(),
}));

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  use: jest.fn(),
}));

jest.mock('../common/hooks', () => ({
  useAppSelector: jest.fn(),
  useAppDispatch: jest.fn(),
}));

const store = configureStore({
  reducer: planetReducer,
});

describe('CardListWrapper', () => {
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
  });

  it('renders the CardList component with data', async () => {
    const mockPlanetData: ResponseType = {
      results: [
        {
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
      ],
      count: 1,
    };

    (fetchData as jest.Mock).mockResolvedValue(mockPlanetData);
    (use as jest.Mock).mockReturnValue(mockPlanetData);

    render(
      <Provider store={store}>
        <CardListWrapper page="1" search="Tatooine" />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('Tatooine')).toBeInTheDocument();
    });
  });

  it('renders the no data message when no data is available', async () => {
    (use as jest.Mock).mockReturnValue(null);

    render(
      <Provider store={store}>
        <CardListWrapper page="1" search="Tatooine" />
      </Provider>
    );

    expect(screen.getByText('No planets data available.')).toBeInTheDocument();
  });

  it('renders the CardList component with an empty search', async () => {
    const mockPlanetData: ResponseType = {
      results: [],
      count: 0,
    };

    (fetchData as jest.Mock).mockResolvedValue(mockPlanetData);
    (use as jest.Mock).mockReturnValue(mockPlanetData);

    render(
      <Provider store={store}>
        <CardListWrapper page="1" search="" />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('No results found.')).toBeInTheDocument();
    });
  });
});
