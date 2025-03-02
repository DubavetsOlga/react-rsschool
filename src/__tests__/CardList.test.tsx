import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import { Provider } from 'react-redux';
import { CardList } from '../common/components';
import { configureStore } from '@reduxjs/toolkit';
import { useGetPlanetsQuery } from '../store/planets/planetsApi';
import { planetReducer, planetSlice } from '../store/planetSlice.ts';
import '@testing-library/jest-dom';

jest.mock('../store/planets/planetsApi', () => ({
  useGetPlanetsQuery: jest.fn(),
}));

jest.mock('../common/components/spinner/Spinner', () => ({
  Spinner: () => <div>Loading...</div>,
}));
jest.mock('../common/components/pagination/Pagination', () => ({
  Pagination: () => <div>Pagination</div>,
}));

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useSearchParams: jest.fn(),
  useNavigate: jest.fn(),
}));

const store = configureStore({
  reducer: {
    [planetSlice.name]: planetReducer,
  },
});

describe('CardList Component', () => {
  const mockUseGetPlanetsQuery = useGetPlanetsQuery as jest.Mock;
  const mockUseSearchParams = jest.requireMock('react-router').useSearchParams;
  const mockSetSearchParams = jest.fn();
  const mockUseNavigate = jest.requireMock('react-router').useNavigate;

  beforeEach(() => {
    jest.clearAllMocks();

    mockUseSearchParams.mockReturnValue([
      new URLSearchParams({ search: 'Tatooine', page: '1' }),
      jest.fn(),
    ]);

    mockUseNavigate.mockReturnValue(jest.fn());
  });

  test('renders loading state', () => {
    mockUseGetPlanetsQuery.mockReturnValue({
      isLoading: true,
      isFetching: false,
      error: null,
      data: null,
    });

    render(
      <BrowserRouter>
        <Provider store={store}>
          <CardList />
        </Provider>
      </BrowserRouter>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('renders error state', () => {
    mockUseGetPlanetsQuery.mockReturnValue({
      isLoading: false,
      isFetching: false,
      error: { data: { message: 'Failed to fetch' } },
      data: null,
    });

    render(
      <BrowserRouter>
        <Provider store={store}>
          <CardList />
        </Provider>
      </BrowserRouter>
    );

    expect(screen.getByText('Error: Failed to fetch')).toBeInTheDocument();
  });

  test('renders no results state', () => {
    mockUseGetPlanetsQuery.mockReturnValue({
      isLoading: false,
      isFetching: false,
      error: null,
      data: { results: [], count: 0 },
    });

    render(
      <BrowserRouter>
        <Provider store={store}>
          <CardList />
        </Provider>
      </BrowserRouter>
    );

    expect(screen.getByText('No results found.')).toBeInTheDocument();
  });

  test('renders data successfully', () => {
    mockUseGetPlanetsQuery.mockReturnValue({
      isLoading: false,
      isFetching: false,
      error: null,
      data: {
        results: [
          { url: '1', name: 'Tatooine', terrain: 'Desert' },
          { url: '2', name: 'Alderaan', terrain: 'Grasslands' },
        ],
        count: 2,
      },
    });

    render(
      <BrowserRouter>
        <Provider store={store}>
          <CardList />
        </Provider>
      </BrowserRouter>
    );

    expect(screen.getByText('Tatooine')).toBeInTheDocument();
    expect(screen.getByText('Alderaan')).toBeInTheDocument();
    expect(screen.getByText('Pagination')).toBeInTheDocument();
  });

  test('does not modify search params when detail is not present and table header is clicked', () => {
    const initialSearchParams = new URLSearchParams('');
    mockUseSearchParams.mockReturnValue([
      initialSearchParams,
      mockSetSearchParams,
    ]);

    render(
      <BrowserRouter>
        <Provider store={store}>
          <CardList />
        </Provider>
      </BrowserRouter>
    );

    const tableHeader = screen.getByRole('row', { name: /Name Terrain/i });
    fireEvent.click(tableHeader);

    expect(mockSetSearchParams).not.toHaveBeenCalled();
  });

  test('should delete the "detail" search parameter when handleClickPanel is called', () => {
    mockUseGetPlanetsQuery.mockReturnValue({
      data: {
        results: [
          {
            name: 'Tatooine',
            terrain: 'desert',
            url: 'https://swapi.dev/api/planets/1/',
          },
        ],
        count: 1,
      },
      isLoading: false,
      isFetching: false,
      error: null,
    });

    const initialSearchParams = new URLSearchParams('detail=1');
    mockUseSearchParams.mockReturnValue([
      initialSearchParams,
      mockSetSearchParams,
    ]);

    render(
      <BrowserRouter>
        <Provider store={store}>
          <CardList />
        </Provider>
      </BrowserRouter>
    );

    const tableHeader = screen.getByRole('table').querySelector('thead');
    if (tableHeader) {
      fireEvent.click(tableHeader);
    }

    expect(mockSetSearchParams).toHaveBeenCalledWith(new URLSearchParams(''));
  });
});
