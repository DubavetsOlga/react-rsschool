import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Search } from '../components';
import {
  BrowserRouter,
  MemoryRouter,
  Route,
  Routes,
  useSearchParams,
} from 'react-router';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { planetReducer } from '../store/planetSlice.ts';

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useSearchParams: jest.fn(),
}));

const store = configureStore({
  reducer: planetReducer,
});

describe('Search Component', () => {
  const mockSetSearchParams = jest.fn();
  const mockGetSearchParams = new URLSearchParams();

  beforeEach(() => {
    mockSetSearchParams.mockClear();
    localStorage.clear();
    (useSearchParams as jest.Mock).mockReturnValue([
      mockGetSearchParams,
      mockSetSearchParams,
    ]);
  });

  it('renders the search input and button', () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Search />
        </Provider>
      </BrowserRouter>
    );

    expect(
      screen.getByPlaceholderText('Enter search term')
    ).toBeInTheDocument();
    expect(screen.getByLabelText('Search button')).toBeInTheDocument();
  });

  it('sets the input field to the search query in URL on initial render', () => {
    mockGetSearchParams.set('search', 'initial search');
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Search />
        </Provider>
      </BrowserRouter>
    );

    const input = screen.getByPlaceholderText('Enter search term');
    expect(input).toHaveValue('initial search');
  });
});

beforeEach(() => {
  localStorage.clear();
  Object.defineProperty(window, 'localStorage', {
    value: {
      setItem: jest.fn(),
      getItem: jest.fn(() => null),
      clear: jest.fn(),
    },
    writable: true,
  });
});

it('should update search params and localStorage when search button is clicked', () => {
  const setSearchParams = jest.fn();

  (useSearchParams as jest.Mock).mockImplementation(() => [
    new URLSearchParams(),
    setSearchParams,
  ]);

  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<Search />} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );

  const input = screen.getByPlaceholderText('Enter search term');
  const button = screen.getByLabelText('Search button');

  fireEvent.change(input, { target: { value: 'test search' } });

  fireEvent.click(button);

  expect(setSearchParams).toHaveBeenCalledWith({ search: 'test search' });

  expect(localStorage.setItem).toHaveBeenCalledWith(
    'searchValue',
    'test search'
  );
});

it('should clear search param if input is empty and search button is clicked', () => {
  render(
    <MemoryRouter initialEntries={['/?search=test%20search']}>
      <Provider store={store}>
        <Search />
      </Provider>
    </MemoryRouter>
  );

  const input = screen.getByPlaceholderText('Enter search term');
  const button = screen.getByLabelText('Search button');

  fireEvent.change(input, { target: { value: '' } });

  fireEvent.click(button);

  expect(window.location.search).toBe('');

  expect(localStorage.setItem).toHaveBeenCalledWith('searchValue', '');
});
