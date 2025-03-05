import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter, useNavigate, useSearchParams } from 'react-router';
import { Provider } from 'react-redux';
import { CardList } from '../common/components';
import { configureStore } from '@reduxjs/toolkit';
import { planetReducer, planetSlice } from '../store/planetSlice';
import '@testing-library/jest-dom';

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
  const mockUseSearchParams = jest.requireMock('react-router').useSearchParams;
  const mockUseNavigate = jest.requireMock('react-router').useNavigate;
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    mockUseSearchParams.mockReturnValue([
      new URLSearchParams({ search: 'Tatooine', page: '1' }),
      jest.fn(),
    ]);

    mockUseNavigate.mockReturnValue(jest.fn());

    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  test('renders loading state', () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <CardList count={0} results={[]} />
        </Provider>
      </BrowserRouter>
    );

    expect(screen.getByText('No results found.')).toBeInTheDocument();
  });

  test('renders error state', () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <CardList count={0} results={[]} />
        </Provider>
      </BrowserRouter>
    );

    expect(screen.getByText('No results found.')).toBeInTheDocument();
  });

  test('renders no results state', () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <CardList count={0} results={[]} />
        </Provider>
      </BrowserRouter>
    );

    expect(screen.getByText('No results found.')).toBeInTheDocument();
  });

  test('renders data successfully', () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <CardList
            count={2}
            results={[
              {
                url: '1',
                name: 'Tatooine',
                terrain: 'Desert',
                rotation_period: '',
                orbital_period: '',
                diameter: '',
                climate: '',
                gravity: '',
                surface_water: '',
                population: '',
                residents: [],
                films: [],
                created: '',
                edited: '',
              },
              {
                url: '2',
                name: 'Alderaan',
                terrain: 'Grasslands',
                rotation_period: '',
                orbital_period: '',
                diameter: '',
                climate: '',
                gravity: '',
                surface_water: '',
                population: '',
                residents: [],
                films: [],
                created: '',
                edited: '',
              },
            ]}
          />
        </Provider>
      </BrowserRouter>
    );

    expect(screen.getByText('Tatooine')).toBeInTheDocument();
    expect(screen.getByText('Alderaan')).toBeInTheDocument();
    expect(screen.getByText('Pagination')).toBeInTheDocument();
  });

  it('should not navigate when no "detail" param is in search params', () => {
    (useSearchParams as jest.Mock).mockReturnValue([new URLSearchParams()]);

    render(
      <Provider store={store}>
        <CardList
          results={[
            {
              url: '1',
              name: 'Tatooine',
              terrain: 'Desert',
              rotation_period: '',
              orbital_period: '',
              diameter: '',
              climate: '',
              gravity: '',
              surface_water: '',
              population: '',
              residents: [],
              films: [],
              created: '',
              edited: '',
            },
          ]}
          count={1}
        />
      </Provider>
    );

    const tableHeader = document.querySelector('thead');
    if (tableHeader) {
      fireEvent.click(tableHeader);
    }

    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('should navigate when "detail" param is in search params', () => {
    const searchParams = new URLSearchParams();
    searchParams.set('detail', '1');
    (useSearchParams as jest.Mock).mockReturnValue([searchParams]);

    render(
      <Provider store={store}>
        <CardList
          results={[
            {
              url: '1',
              name: 'Tatooine',
              terrain: 'Desert',
              rotation_period: '',
              orbital_period: '',
              diameter: '',
              climate: '',
              gravity: '',
              surface_water: '',
              population: '',
              residents: [],
              films: [],
              created: '',
              edited: '',
            },
          ]}
          count={1}
        />
      </Provider>
    );

    const tableHeader = document.querySelector('thead');
    if (tableHeader) {
      fireEvent.click(tableHeader);
    }

    expect(mockNavigate).toHaveBeenCalledWith({
      pathname: '/',
      search: '',
    });
  });
});
