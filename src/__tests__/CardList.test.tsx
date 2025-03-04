import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import '@testing-library/jest-dom';
import { CardList } from '../components';
import { planetReducer, planetSlice } from '../common/store/planetSlice';
import { ResponseType } from '../common/types';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
  usePathname: jest.fn(),
}));

const store = configureStore({
  reducer: {
    [planetSlice.name]: planetReducer,
  },
});

describe('CardList Component', () => {
  const mockPush = jest.fn();
  const mockSearchParams = new URLSearchParams();

  const mockPlanetData: ResponseType = {
    results: [
      {
        name: 'Tatooine',
        rotation_period: '24',
        orbital_period: '365',
        diameter: '12742',
        climate: 'temperate',
        gravity: '1',
        terrain: 'mountains, forests, oceans',
        surface_water: '71',
        population: '7 billion',
        residents: ['Luke Skywalker'],
        films: ['A New Hope'],
        created: '2023-02-06',
        edited: '2023-02-06',
        url: 'https://swapi.dev/api/planets/1/',
      },
      {
        name: 'Alderaan',
        rotation_period: '23',
        orbital_period: '304',
        diameter: '10465',
        climate: 'arid',
        gravity: '1',
        terrain: 'desert',
        surface_water: '1',
        population: '200000',
        residents: ['Luke Skywalker'],
        films: ['A New Hope'],
        created: '2023-02-06',
        edited: '2023-02-06',
        url: 'https://swapi.dev/api/planets/2/',
      },
    ],
    count: 2,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (usePathname as jest.Mock).mockReturnValue('/');
    (useSearchParams as jest.Mock).mockReturnValue(mockSearchParams);
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
      query: { search: 'Tatooine', page: '1' },
    });
  });

  test('renders loading state', () => {
    render(
      <Provider store={store}>
        <CardList results={[]} count={0} />
      </Provider>
    );

    expect(screen.getByText('No results found.')).toBeInTheDocument();
  });

  test('renders error state', () => {
    render(
      <Provider store={store}>
        <CardList results={[]} count={0} />
      </Provider>
    );

    expect(screen.getByText('No results found.')).toBeInTheDocument();
  });

  test('renders data successfully', () => {
    render(
      <Provider store={store}>
        <CardList
          results={mockPlanetData.results}
          count={mockPlanetData.count}
        />
      </Provider>
    );

    expect(screen.getByText('Tatooine')).toBeInTheDocument();
    expect(screen.getByText('Alderaan')).toBeInTheDocument();
  });

  test('should not modify search params when detail is not present and table header is clicked', () => {
    render(
      <Provider store={store}>
        <CardList
          results={mockPlanetData.results}
          count={mockPlanetData.count}
        />
      </Provider>
    );

    const tableHeader = screen.getByRole('row', { name: /Name Terrain/i });
    fireEvent.click(tableHeader);

    expect(mockPush).not.toHaveBeenCalled();
  });

  test('renders no results message if results are empty', () => {
    render(
      <Provider store={store}>
        <CardList results={[]} count={0} />
      </Provider>
    );

    expect(screen.getByText('No results found.')).toBeInTheDocument();
  });
});
