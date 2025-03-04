import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Search } from '../components';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { planetReducer } from '../common/store/planetSlice';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
  usePathname: jest.fn(),
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
  const mockPush = jest.fn();
  const mockSearchParams = new URLSearchParams();

  beforeEach(() => {
    mockPush.mockClear();
    localStorage.clear();

    (usePathname as jest.Mock).mockReturnValue('/');
    (useSearchParams as jest.Mock).mockReturnValue(mockSearchParams);
    (useRouter as jest.Mock).mockReturnValue({
      query: { search: 'initial search' },
      push: mockPush,
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

  it('should update search params and localStorage when search button is clicked', () => {
    render(
      <Provider store={store}>
        <Search />
      </Provider>
    );

    const input = screen.getByPlaceholderText('Enter search term');
    const button = screen.getByLabelText('Search button');

    fireEvent.change(input, { target: { value: 'test search' } });
    fireEvent.click(button);

    expect(mockPush).toHaveBeenCalledWith('/?search=test+search');

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'searchValue',
      'test search'
    );
  });

  it('should clear search param if input is empty and search button is clicked', () => {
    render(
      <Provider store={store}>
        <Search />
      </Provider>
    );

    const input = screen.getByPlaceholderText('Enter search term');
    const button = screen.getByLabelText('Search button');

    fireEvent.change(input, { target: { value: '' } });
    fireEvent.click(button);

    expect(mockPush).toHaveBeenCalledWith('/?');

    expect(localStorage.setItem).toHaveBeenCalledWith('searchValue', '');
  });
});
