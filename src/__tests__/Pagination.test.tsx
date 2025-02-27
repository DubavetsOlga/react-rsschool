import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Pagination } from '../components';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { planetReducer } from '../common/store/planetSlice';
import { useRouter, useSearchParams } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

const store = configureStore({
  reducer: planetReducer,
});

describe('Pagination Component', () => {
  it('should render pagination buttons correctly based on totalItems and itemsPerPage', () => {
    const mockNavigate = jest.fn();
    (useRouter as jest.Mock).mockReturnValue(mockNavigate);
    const mockSearchParams = new URLSearchParams();
    (useSearchParams as jest.Mock).mockReturnValue(mockSearchParams);

    const totalItems = 50;
    const itemsPerPage = 10;

    render(
      <Provider store={store}>
        <Pagination itemsPerPage={itemsPerPage} totalItems={totalItems} />
      </Provider>
    );

    const pageButtons = screen.getAllByRole('button', { name: /go to page/i });
    expect(pageButtons).toHaveLength(5);
  });

  it('should not render pagination if there is only 1 page', () => {
    const mockNavigate = jest.fn();
    (useRouter as jest.Mock).mockReturnValue(mockNavigate);
    const mockSearchParams = new URLSearchParams();
    (useSearchParams as jest.Mock).mockReturnValue(mockSearchParams);

    render(
      <Provider store={store}>
        <Pagination itemsPerPage={10} totalItems={5} />
      </Provider>
    );

    const pageButtons = screen.queryAllByRole('button', {
      name: /go to page/i,
    });
    expect(pageButtons).toHaveLength(0);
  });

  it('should handle page click correctly', () => {
    const mockPush = jest.fn();
    const mockSearchParams = new URLSearchParams();
    (useRouter as jest.Mock).mockReturnValue({
      query: { page: '1' },
      push: mockPush,
    });
    (useSearchParams as jest.Mock).mockReturnValue(mockSearchParams);

    render(
      <Provider store={store}>
        <Pagination itemsPerPage={10} totalItems={50} />
      </Provider>
    );

    const page2Button = screen.getByText('2');
    fireEvent.click(page2Button);

    expect(mockPush).toHaveBeenCalledWith(expect.stringContaining('?page=2'));
  });
});
