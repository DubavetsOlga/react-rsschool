import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { useRouter } from 'next/router';
import { CardList } from '../components';
import '@testing-library/jest-dom';
import { planetReducer, planetSlice } from '../common/store/planetSlice';
import { ResponseType } from '../common/types';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

const store = configureStore({
  reducer: {
    [planetSlice.name]: planetReducer,
  },
});

describe('CardList Component', () => {
  const mockUseRouter = useRouter as jest.Mock;

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
    mockUseRouter.mockReturnValue({
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

  test('clicking on table header triggers handleClickPanel', () => {
    const pushMock = jest.fn();
    mockUseRouter.mockReturnValue({
      push: pushMock,
      query: { detail: '1' },
    });

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

    expect(pushMock).toHaveBeenCalledWith({
      pathname: '/',
      query: {},
    });
  });

  test('should not modify search params when detail is not present and table header is clicked', () => {
    const pushMock = jest.fn();
    mockUseRouter.mockReturnValue({
      push: pushMock,
      query: {}, // No detail query
    });

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

    expect(pushMock).not.toHaveBeenCalled();
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
