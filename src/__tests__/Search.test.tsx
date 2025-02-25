import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Search } from '../components';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { planetReducer } from '../common/store/planetSlice';
import { useRouter } from 'next/router';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

const store = configureStore({
  reducer: planetReducer,
});

beforeEach(() => {
  Object.defineProperty(window, 'localStorage', {
    value: {
      setItem: jest.fn(),
      getItem: jest.fn(() => null),
      clear: jest.fn(),
    },
    writable: true,
  });
});

describe('Search Component', () => {
  const mockSetSearchParams = jest.fn();

  beforeEach(() => {
    mockSetSearchParams.mockClear();
    localStorage.clear();
    (useRouter as jest.Mock).mockReturnValue({
      query: { search: 'initial search' },
      push: mockSetSearchParams,
      replace: mockSetSearchParams,
      pathname: '/',
    });
  });

  it('renders the search input and button', () => {
    render(
      <Provider store={store}>
        <Search />
      </Provider>
    );

    expect(
      screen.getByPlaceholderText('Enter search term')
    ).toBeInTheDocument();
    expect(screen.getByLabelText('Search button')).toBeInTheDocument();
  });

  it('sets the input field to the search query in URL on initial render', () => {
    (useRouter as jest.Mock).mockReturnValue({
      query: { search: 'initial search' },
      push: mockSetSearchParams,
      replace: mockSetSearchParams,
      pathname: '/',
    });

    render(
      <Provider store={store}>
        <Search />
      </Provider>
    );

    const input = screen.getByPlaceholderText('Enter search term');
    expect(input).toHaveValue('initial search');
  });

  it('should update search params and localStorage when search button is clicked', () => {
    const setSearchParams = jest.fn();

    (useRouter as jest.Mock).mockReturnValue({
      query: {},
      push: setSearchParams,
      replace: setSearchParams,
      pathname: '/',
    });

    render(
      <Provider store={store}>
        <Search />
      </Provider>
    );

    const input = screen.getByPlaceholderText('Enter search term');
    const button = screen.getByLabelText('Search button');

    fireEvent.change(input, { target: { value: 'test search' } });
    fireEvent.click(button);

    expect(setSearchParams).toHaveBeenCalledWith({
      pathname: '/',
      query: { search: 'test search' },
    });

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'searchValue',
      'test search'
    );
  });

  it('should clear search param if input is empty and search button is clicked', () => {
    (useRouter as jest.Mock).mockReturnValue({
      query: { search: 'test search' },
      push: jest.fn(),
      replace: jest.fn(),
      pathname: '/',
    });

    render(
      <Provider store={store}>
        <Search />
      </Provider>
    );

    const input = screen.getByPlaceholderText('Enter search term');
    const button = screen.getByLabelText('Search button');

    fireEvent.change(input, { target: { value: '' } });
    fireEvent.click(button);

    expect(window.location.search).toBe('');

    expect(localStorage.setItem).toHaveBeenCalledWith('searchValue', '');
  });
});
