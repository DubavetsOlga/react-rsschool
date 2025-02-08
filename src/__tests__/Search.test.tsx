import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Search } from '../components/search/Search';
import {
  BrowserRouter,
  MemoryRouter,
  Route,
  Routes,
  useSearchParams,
} from 'react-router';

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useSearchParams: jest.fn(),
}));

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
        <Search />
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
        <Search />
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
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route path="/" element={<Search />} />
      </Routes>
    </MemoryRouter>
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
      <Search />
    </MemoryRouter>
  );

  const input = screen.getByPlaceholderText('Enter search term');
  const button = screen.getByLabelText('Search button');

  fireEvent.change(input, { target: { value: '' } });

  fireEvent.click(button);

  expect(window.location.search).toBe('');

  expect(localStorage.setItem).toHaveBeenCalledWith('searchValue', '');
});
